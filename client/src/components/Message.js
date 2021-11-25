import React from "react";
import styles from '../pages/Chat/chat.module.css'

const Message = ({message, own, newUser}) => {

    return (
        <>
            {!!own ? (
                <div className={styles.chat + " " + styles.outgoing}>
                    <div className={styles.chatDetails}>
                        <p>{message.text}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.chat + " " + styles.incoming}>
                    <img src={newUser.avatar}
                         alt=""/>
                    <div className={styles.chatDetails}>
                        <p>{message.text}</p>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Message