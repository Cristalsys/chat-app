import {
    CLEAR_ERRORS, CLEAR_ERRORS_RESET, LOADING, LOADING_NEW_USER, LOADING_RESET,
    LOADING_USER, LOADING_USERS, RESET_EMAIL,
    SET_AUTHENTICATED,
    SET_ERRORS, SET_ERRORS_RESET, SET_NEW_USER, SET_NEW_USER_EMPTY,
    SET_UNAUTHENTICATED,
    SET_USER,
    SET_USERS, UNLOADING, UNLOADING_RESET, UPDATE_PASSWORD
} from "./UserTypes";


function noop() {
}

const initialState = {
    authenticated: false,
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    loadingUser: false,
    loadingUsers: false,
    loadingNewUser: false,
    loadingReset: false,
    errors: null,
    errorsReset: null,
    users: [],
    newUser: {},
    resetEmail: '',
    password: '',
    login: noop,
    logout: noop

};

const UserReducer = (state, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED: {
            return initialState
        }
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case UNLOADING:
            return {
                ...state,
                loading: false
            };
        case LOADING_USER:
            return {
                ...state,
                loadingUser: true
            };
        case LOADING_USERS:
            return {
                ...state,
                loadingUsers: true
            };
        case LOADING_NEW_USER:
            return {
                ...state,
                loadingNewUser: true

            };
        case SET_ERRORS: {
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                loading: false,
                errors: []
            }
        }
        case SET_USER: {
            return {
                authenticated: true,
                loadingUser: false,
                ...action.payload
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.payload,
                loadingUsers: false
            }
        }
        case SET_NEW_USER: {
            return {
                ...state,
                newUser: action.payload,
                loadingNewUser: false
            }
        }
        case SET_NEW_USER_EMPTY: {
            return {
                ...state,
                newUser: {}
            }
        }
        case SET_ERRORS_RESET: {
            return {
                ...state,
                loading: false,
                errorsReset: action.payload
            }
        }
        case CLEAR_ERRORS_RESET: {
            return {
                ...state,
                loading: false,
                errorsReset: []
            }
        }
        case LOADING_RESET: {
            return {
                ...state,
                loadingReset: true
            }
        }
        case UNLOADING_RESET: {
            return {
                ...state,
                loadingReset: false
            }
        }
        case RESET_EMAIL: {
            return {
                ...state,
                resetEmail: action.payload
            }
        }
        case UPDATE_PASSWORD: {
            return {
                ...state,
                password: action.payload
            }
        }

        default:
            return state;
    }
};

export {initialState, UserReducer}