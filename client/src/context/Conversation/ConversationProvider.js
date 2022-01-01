import ConversationContext from "./ConversationContext";
import {useReducer} from "react";
import {ConversationReducer, initialState} from "./ConversationReducer";
import axios from "axios";
import {
    ADD_CONVERSATION,
    ADD_MESSAGE,
    CONVERSATION_LOADING,
    CONVERSATIONS_LOADING,
    MESSAGES_LOADING,
    SET_CONVERSATION,
    SET_CONVERSATIONS, SET_EMPTY_CONV_MESS,
    SET_MESSAGES
} from "./ConversationTypes";


const UserProvider = (props) => {

    const [state, dispatch] = useReducer(ConversationReducer, initialState);

    const getConversations = (userId) => {
        dispatch({type: CONVERSATIONS_LOADING})
        axios.get(`/api/conversation/${userId}`,)
            .then((res) => {
                dispatch({
                    type: SET_CONVERSATIONS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log('Errors', err)
            })
    }

    const addConversation = (conversationData, history) => {
        axios.post(`/api/conversation/`, conversationData)
            .then((res) => {
                dispatch({
                    type: ADD_CONVERSATION,
                    payload: res.data
                })
                history.push(`/user/${conversationData.receiver}`)
            })
            .catch(err => {
                console.log('Errors', err)
            })
    }
    const getOneConversation = (conversationData) => {
        dispatch({type: CONVERSATION_LOADING})
        axios.get(`/api/conversation/find/${conversationData.sender}/${conversationData.receiver}`)
            .then((res) => {
                dispatch({
                    type: SET_CONVERSATION,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log('Errors', err)
            })
    }


    const getMessages = (conversationId) => {
        dispatch({type: MESSAGES_LOADING})
        axios.get(`/api/message/${conversationId}`,)
            .then((res) => {
                dispatch({
                    type: SET_MESSAGES,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log('Errors', err)
            })
    }

    const addMessage = (messageData) => {
        axios.post(`/api/message/`, messageData)
            .then((res) => {
                dispatch({
                    type: ADD_MESSAGE,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log('Errors', err)
            })
    }

    const setEmptyConvMess = () => {
        dispatch({type: SET_EMPTY_CONV_MESS})
    }

    return (
        <ConversationContext.Provider value={{
            loadingConversation: state.loadingConversation,
            oneConversationLoading: state.oneConversationLoading,
            messageLoading: state.messageLoading,
            conversations: state.conversations,
            conversation: state.conversation,
            messages: state.messages,
            members: state.members,
            getConversations,
            addConversation,
            getOneConversation,
            getMessages,
            addMessage,
            setEmptyConvMess
        }}>
            {props.children}
        </ConversationContext.Provider>
    )
}

export default UserProvider

