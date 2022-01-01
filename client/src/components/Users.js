import React, {Fragment, useContext} from "react";
import {withRouter} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDotCircle} from '@fortawesome/free-solid-svg-icons'
import UserContext from "../context/User/UserContext";
import ConversationContext from "../context/Conversation/ConversationContext";
import styles from '../pages/Home/home.module.css'

const Users = ({users, history, onlineUsers}) => {


    const auth = useContext(UserContext)
    const conv = useContext(ConversationContext)


    const onClickConversationHandler = async (userId) => {
        try {

            let arr = [userId, auth._id].sort().join('')
            let isConversation = false
            conv.conversations && conv.conversations.filter((conv) => {
                const str = conv.members.sort().join('')
                if (str === arr) {
                    isConversation = true
                }
            })

            // addConversation
            if (!isConversation) {
                const sendData = {
                    sender: auth._id,
                    receiver: userId
                }
                conv.addConversation(sendData, history)
                // redirect conversation
            } else {
                history.push(`/user/${userId}`)
            }

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            {users && users.length > 0 ? (
                <div className={styles.usersList}>
                    {users &&
                        users.length > 0 && users[0] !== 'undefined' &&
                        users.filter(user => user._id !== auth._id)
                            .map((user, index) => (
                        <Fragment key={user._id}>
                            <div className={styles.userListLink} onClick={() =>
                                onClickConversationHandler(user._id)}>
                                <div className={styles.userListContent}>
                                    <img src={user.avatar} alt="" className={styles.userListContentImg}/>
                                    <div className={styles.userListDetails}>
                                        <div
                                            className={styles.userListDetailsFirstChild}>{user.firstName + " " + user.lastName}</div>
                                        <div className={styles.userListDetailsLastChild}>{'click here to chat'}</div>
                                    </div>
                                </div>
                                <div className={onlineUsers && onlineUsers.includes(user._id) ?
                                    styles.faOnline : styles.faOffline}><FontAwesomeIcon icon={faDotCircle}/></div>
                            </div>
                            {index !== users.filter(user => user._id !== auth._id).length - 1 && (
                                <div className={styles.borderLine}></div>
                            )}
                        </Fragment>
                    ))}
                </div>
            ) : (
                <div>
                    no users
                </div>
            )}
        </>
    )
}

export default withRouter(Users)
