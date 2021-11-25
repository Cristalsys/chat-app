import {
    ADD_CONVERSATION, ADD_MESSAGE,
    CONVERSATION_LOADING,
    CONVERSATIONS_LOADING, MESSAGES_LOADING,
    SET_CONVERSATION,
    SET_CONVERSATIONS, SET_EMPTY_CONV_MESS, SET_MESSAGES
} from "./ConversationTypes";


const initialState = {
    conversations: [],
    messages: [],
    conversation: {},
    conversationsLoading: false,
    oneConversationLoading: false,
    messageLoading: false,

};

const ConversationReducer = (state, action) => {
    switch (action.type) {
        case CONVERSATIONS_LOADING:
            return {
                ...state,
                conversationsLoading: true
            }
        case CONVERSATION_LOADING:
            return {
                ...state,
                oneConversationLoading: true
            }
        case MESSAGES_LOADING:
            return {
                ...state,
                messageLoading: true
            }
        case SET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
                conversationsLoading: false
            }
        case SET_CONVERSATION:
            return {
                ...state,
                conversation: action.payload,
                oneConversationLoading: false
            }
        case ADD_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, action.payload]
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
                messageLoading: false
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case SET_EMPTY_CONV_MESS:
            return {
                ...state,
                messages: [],
                conversation: {}
            }

        default:
            return state;
    }
};

export {initialState, ConversationReducer}