import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../context/User/UserContext";
// import './home.module.css'
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Users from "../../components/Users";
import ConversationContext from "../../context/Conversation/ConversationContext";
import styles from './home.module.css'

const Home = ({history, socket, onlineUsers}) => {

    const [search, setSearch] = useState('')

    const auth = useContext(UserContext)
    const conv = useContext(ConversationContext)


    useEffect(() => {
        if (auth._id) {
            conv.getConversations(auth._id)
        }
    }, [auth._id])

    const logoutHandler = (event) => {
        socket.emit('logout', auth._id)
        event.preventDefault()
        auth.logoutUser(history)
    }

    const getFilteredData = () => {
        if (!search) {
            return auth.users
        }
        return auth.users.filter(user => user._id !== auth._id).filter(item => {
            return item['firstName'].toLowerCase().includes(search.toLowerCase())
                || item['lastName'].toLowerCase().includes(search.toLowerCase())
        })
    }

    const valueChangeSearchHandler = (event) => {
        setSearch(event.target.value)
    }

    const filteredData = getFilteredData()

    return (
        <div>
            {!auth.loadingUser && !auth.loadingUsers ? (auth.authenticated ? (
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.content}>
                            <img src={auth.avatar} className={styles.contentImg}
                                 alt=""/>
                            <div className={styles.details}>
                                <div
                                    className={styles.userListDetailsFirstChild}>
                                    {auth.firstName + " " + auth.lastName}
                                </div>
                                <div className={styles.userListDetailsLastChild}>
                                    active now
                                </div>
                            </div>
                        </div>
                        <div className={styles.logout} onClick={logoutHandler}>
                            <Link to="/"><span>logout</span></Link>
                        </div>
                    </div>
                    <div className={styles.search}>
                        <input autoFocus type="text" placeholder={'Search...'}
                               value={search}
                               onChange={valueChangeSearchHandler}
                        />
                        <div className={styles.faSearch}><FontAwesomeIcon icon={faSearch}/></div>
                    </div>
                    <div>
                        <Users users={filteredData}
                               socket={socket}
                               onlineUsers={onlineUsers}
                        />
                    </div>
                </div>
            ) : (<div>
                {history.push('/login')}
            </div>)) : (
                <div>
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default withRouter(Home)