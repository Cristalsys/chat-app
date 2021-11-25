import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'
import UserProvider from "./context/User/UserProvider";
import ConversationProvider from "./context/Conversation/ConversationProvider";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <ConversationProvider>
                <App/>
            </ConversationProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
