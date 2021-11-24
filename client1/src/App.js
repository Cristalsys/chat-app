import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import UserContext from "./context/User/UserContext";
import axios from "axios";

// socket.io
import {io} from 'socket.io-client'

const token = localStorage.FBIdToken;
const ENDPOINT = 'http://localhost:5000'

function App() {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const auth = useContext(UserContext)

    const setupSocket = () => {
        const authToken = localStorage.getItem('FBIdToken')
        if (authToken && !socket) {
            const newSocket = io(ENDPOINT,
                {query: {token: localStorage.getItem('FBIdToken')}}
            )

            newSocket.on('connect', () => {
                console.log(`Socket connected ` + newSocket.id)
            })

            setSocket(newSocket)
        }
    }

    useEffect(() => {

        if (token) {
            auth.setAuthenticated()
            axios.defaults.headers.common['Authorization'] = token;
            auth.getUserData();
            setupSocket()
        }
        setLoading(true)

    }, [token])


    useEffect(() => {
        if (auth && auth._id) {
            socket.emit('addUser', auth._id)
            socket.on("getUsers", (users) => {
                setOnlineUsers(users)
            })

        }

    }, [auth, auth._id])


    const routes = useRoutes(
        {
            isAuthenticated: auth.authenticated,
            setupSocket,
            socket,
            onlineUsers
        })

    return (
        <Router>
            <div className="App">
                {loading && routes}
            </div>
        </Router>
    );
}

export default App;
