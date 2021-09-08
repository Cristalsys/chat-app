const User = require('../models/User')


const getAuthenticatedUser = async (req, res) => {
    try {
        let user = await User.findById(req.user.userAuth._id)
            .select("-password")
        if (!user) {
            return res.status(403).json({message: 'you are not in system'})
        }

        res.json(user)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({error: e.code})
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.json(users)
    } catch (e) {
        console.log(e.code)
        res.status(500).json({error: e.code})
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password')

        if (!user) {
            return res.status(404).json({message: 'user not found'})
        }

        res.json(user)

    } catch (e) {
        console.log(e.code)
        res.status(500).json({message: 'something is wrong'})
    }
}

module.exports =
    {
        getAuthenticatedUser,
        getUsers,
        getUser,
    }