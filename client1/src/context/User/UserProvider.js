import UserContext from "./UserContext";
import {useReducer} from "react";
import axios from 'axios'
import {initialState, UserReducer} from "./UserReducer";
import {
    CLEAR_ERRORS, CLEAR_ERRORS_RESET,
    LOADING, LOADING_NEW_USER, LOADING_RESET,
    LOADING_USER,
    LOADING_USERS, RESET_EMAIL,
    SET_AUTHENTICATED,
    SET_ERRORS, SET_ERRORS_RESET, SET_NEW_USER, SET_NEW_USER_EMPTY, SET_UNAUTHENTICATED,
    SET_USER,
    SET_USERS, UNLOADING, UNLOADING_RESET, UPDATE_PASSWORD
} from "./UserTypes";


const UserProvider = (props) => {

    const [state, dispatch] = useReducer(UserReducer, initialState);


    const login = (userData, history, setupSocket) => {
        dispatch({type: LOADING})
        axios.post('/auth/signin', userData)
            .then((res) => {
                setAuthorizationHeader(res.data.token)
                getUserData()
                dispatch({type: CLEAR_ERRORS})
                dispatch({type: UNLOADING})
                history.push('/')
                setupSocket()

            })
            .catch(err => {
                console.log('Errors', err.response.data.message)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.message
                })
            })
    }

    const loginGoogle = (response, history, setupSocket) => {
        dispatch({type: LOADING})
        axios.post('/auth/googleLogin', {token: response.tokenId})
            .then((res) => {
                setAuthorizationHeader(res.data.token)
                getUserData()
                dispatch({type: CLEAR_ERRORS})
                dispatch({type: UNLOADING})
                history.push('/')
                setupSocket()

            })
            .catch(err => {
                console.log('Errors', err.response.data.message)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.message
                })
            })
    }

    const register = (newUserData, history, setupSocket) => {
        dispatch({type: LOADING})
        axios.post('/auth/signup', newUserData)
            .then((res) => {
                setAuthorizationHeader(res.data.token)
                getUserData()
                dispatch({type: CLEAR_ERRORS})
                dispatch({type: UNLOADING})
                history.push('/')
                setupSocket()
            })
            .catch(err => {
                console.log('Errors', err.response.data.message)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.message
                })
            })
    }


    const logoutUser = (history) => {
        localStorage.removeItem('FBIdToken');
        delete axios.defaults.headers.common['Authorization'];
        dispatch({type: SET_UNAUTHENTICATED});
        history.push('/login')
    };


    const getUserData = () => {
        dispatch({type: LOADING_USER});
        axios.get(`/user/me`)
            .then(res => {
                dispatch({
                    type: SET_USER,
                    payload: res.data
                })
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    const getAllUsers = () => {
        dispatch({type: LOADING_USERS})
        axios.get('/user/')
            .then(res => {
                dispatch({
                    type: SET_USERS,
                    payload: res.data
                })
            })
            .catch(() => {
                dispatch({
                    type: SET_USERS,
                    payload: []
                })
            })
    }

    const getNewUser = (userId) => {
        dispatch({type: LOADING_NEW_USER})
        axios.get(`/user/${userId}`)
            .then((res) => {
                dispatch({
                    type: SET_NEW_USER,
                    payload: res.data
                })
            })
            .catch((err) => console.log(err))
    }

    const setAuthorizationHeader = (token) => {
        const FBIdToken = `Bearer ${token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
    };


    const forgotPassword = (userData, history) => {
        dispatch({type: LOADING})
        axios.post('/auth/forgotPassword', userData)
            .then((res) => {
                console.log('res ', res)
                dispatch({type: CLEAR_ERRORS})
                dispatch({type: UNLOADING})
                history.push('/login')
            })
            .catch(err => {
                console.log('Errors: ', err.response.data.message)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.message
                })
            })
    }

    const resetPassword = (userData) => {
        dispatch({type: LOADING_RESET})
        axios.get('/auth/reset/' + userData)
            .then((res) => {
                dispatch({
                    type: RESET_EMAIL,
                    payload: res.data.email
                })
                dispatch({type: SET_ERRORS_RESET})
                dispatch({type: UNLOADING_RESET})
            })
            .catch(err => {
                console.log('Errors: ', err.response.data.message)
                dispatch({
                    type: CLEAR_ERRORS_RESET,
                    payload: err.response.data.message
                })
            })
    }

    const updatePasswordViaEmail = (userData, history) => {
        dispatch({type: LOADING})
        console.log('userData', userData)
        axios.post('/auth/updatePasswordViaEmail', userData)
            .then((res) => {
                dispatch({
                    type: UPDATE_PASSWORD,
                    payload: res.data.password
                })
                dispatch({type: CLEAR_ERRORS})
                dispatch({type: UNLOADING})
                history.push('/login')
            })
            .catch(err => {
                console.log('Errors: ', err.response.data.message)
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data.message
                })
            })
    }

    const setAuthenticated = () => {
        dispatch({type: SET_AUTHENTICATED});
    }

    const cleanErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }

    const emptyNewUser = () => {
        dispatch({type: SET_NEW_USER_EMPTY})
    }

    return (
        <UserContext.Provider value={{
            loading: state.loading,
            loadingUser: state.loadingUser,
            loadingUsers: state.loadingUsers,
            loadingNewUser: state.loadingNewUser,
            authenticated: state.authenticated,
            errors: state.errors,
            _id: state._id,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            avatar: state.avatar,
            users: state.users,
            newUser: state.newUser,
            errorsReset: state.errorsReset,
            loadingReset: state.loadingReset,
            resetEmail: state.resetEmail,
            login,
            register,
            logoutUser,
            getUserData,
            getNewUser,
            setAuthenticated,
            cleanErrors,
            emptyNewUser,
            loginGoogle,
            forgotPassword,
            resetPassword,
            updatePasswordViaEmail
        }
        }>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider