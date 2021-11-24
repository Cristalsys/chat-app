import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ForgotPassword from "./pages/ForgorPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

export const useRoutes = ({isAuthenticated, setupSocket, socket, onlineUsers}) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route
                    path="/"
                    render={() => <Home socket={socket} onlineUsers={onlineUsers}/>}
                    exact
                />
                <Route
                    path="/user/:userId"
                    render={() => <Chat socket={socket} onlineUsers={onlineUsers}/>}
                    exact
                />
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route
                path="/register"
                render={() => <Register setupSocket={setupSocket}/>}
                exact
            />
            <Route
                path="/login"
                render={() => <Login setupSocket={setupSocket}/>}
                exact
            />
            <Route
                path="/forgotPassword"
                render={() => <ForgotPassword/>}
                exact
            />
            <Route
                path="/reset/:token"
                render={() => <ResetPassword/>}
                exact
            />
            <Redirect to="/login"/>
        </Switch>
    )
}
