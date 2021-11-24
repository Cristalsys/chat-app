const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const http = require('http')
const socketio = require('socket.io')
const jwt = require('jsonwebtoken')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})



if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })

}
//2332
const PORT = process.env.PORT || 5000

// middleware
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/conversation', require('./routes/conversation.routes'))
app.use('/api/message', require('./routes/message.routes'))

async function start() {

    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        server.listen(PORT, () => {
            console.log(`App has been start on PORT ${PORT} ... `)
        })
    } catch (e) {
        console.log("Server error", e.message)
        process.exit(1)
    }
}

start()

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId});

};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const removeUserId = (userId) => {
    users = users.filter(user => user.userId !== userId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.use(async (socket, next) => {

    const token = socket.handshake.query.token.split(' ')[1]
    if (token) {
        try {
            const decoded = await jwt.verify(token, config.get('jwtSecret'))
            if (!decoded) {
                return next(new Error('Not authorized'));
            }
            socket.decoded = decoded.userAuth._id
            return next();
        } catch (err) {
            next(err);
        }
    } else {
        return next(new Error('Not authorized'));
    }
}).on('connection', (socket) => {
    console.log('-----------------')
    console.log('we have a new connection ' + socket.id)

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users.map((user) => {
            return user.userId
        }))
    })

    socket.on('sendMessage', ({senderId, receiverId, text, conversation}) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
                conversation
            });
        }
    })

    socket.on('disconnect', () => {
        console.log('User has left: ' + socket.id)
        removeUser(socket.id)
        io.emit("getUsers", users)
    })

    socket.on('logout', (userId) => {
        removeUserId(userId)
        io.emit("getUsers", users)
    })
})


