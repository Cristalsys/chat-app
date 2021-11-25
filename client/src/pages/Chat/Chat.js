import React, {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../context/User/UserContext";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faReply} from '@fortawesome/free-solid-svg-icons'

import styles from './chat.module.css'
import ConversationContext from "../../context/Conversation/ConversationContext";
import Message from "../../components/Message";

const Chat = (props) => {

    const auth = useContext(UserContext)
    const conv = useContext(ConversationContext)
    const scrollRef = useRef()

    const [text, setText] = useState('')
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null)


    useEffect(() => {
        props.socket && props.socket.on("getMessage", data => {
            setArrivalMessage({
                conversation: conv.conversation._id,
                sender: data.senderId,
                text: data.text,
            })
        })

    }, [])

    useEffect(() => {
        if (arrivalMessage && conv.conversation.members.includes(arrivalMessage.sender)) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage])


    useEffect(() => {

        if (!auth.loadingUser) {
            const userId = props.match.params.userId;
            auth.getNewUser(userId)
            const sendData = {
                sender: auth._id,
                receiver: userId
            }
            conv.getOneConversation(sendData)
        }
    }, [auth.loadingUser])

    useEffect(() => {

        if (!messages.length) {
            setMessages(conv.messages)
        } else {
            setMessages(messages)
        }
        return () => {
            setMessages([])
        }
    }, [conv.messages])


    useEffect(() => {
        if (conv.conversation._id) {
            conv.getMessages(conv.conversation._id)
        }
    }, [conv.conversation._id])


    const onChangeTextHandler = (event) => {
        setText(event.target.value)
    }

    const onClickButton = (event) => {
        event.preventDefault()

        if (text) {
            const sendData = {
                conversation: conv.conversation._id,
                sender: auth._id,
                text
            }

            props.socket.emit('sendMessage', {
                senderId: auth._id,
                receiverId: props.match.params.userId,
                text,
                conversation: conv.conversation._id
            })

            conv.addMessage(sendData)
            setMessages([...messages, sendData]);
            setText('')

        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const handleClickBack = (event) => {
        event.preventDefault()
        props.history.push('/')
        auth.emptyNewUser()
        conv.setEmptyConvMess()
    }

    return (
        <div>
            {!auth.loadingUser && !auth.loadingNewUser && auth.newUser
                ? (auth.authenticated ? (
                    <div className={styles.chatWrapper}>
                        <div className={styles.chatHeader}>
                            <div onClick={handleClickBack}><FontAwesomeIcon icon={faArrowLeft}/></div>
                            <img src={auth.newUser.avatar}
                                 alt=""/>
                            <div className={styles.chatTitle}>
                                <div>{auth.newUser.firstName
                                + " " + auth.newUser.lastName}</div>
                                {props.onlineUsers && props.onlineUsers.includes(props.match.params.userId)
                                    ? <div>active now</div> : <div>offline now</div>
                                }
                            </div>
                        </div>
                        <div className={styles.chatBox}>
                            {messages && messages.length > 0 && messages.map((mes, index) => (
                                <div key={index} ref={scrollRef}>
                                    <Message
                                        message={mes}
                                        own={mes.sender === auth._id}
                                        newUser={auth.newUser}
                                    />
                                </div>
                            ))}
                        </div>
                        <form action="" className={styles.chatForm}>
                            <input
                                type="text"
                                placeholder={'write...'}
                                value={text}
                                onChange={onChangeTextHandler}
                            />
                            <button onClick={onClickButton}><FontAwesomeIcon icon={faReply}/></button>
                        </form>
                    </div>) : <div>
                    {props.history.push('/login')}
                </div>) : <div>
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>}
        </div>
    )
}

export default withRouter(Chat)