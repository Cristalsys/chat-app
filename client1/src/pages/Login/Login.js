import React, {useContext, useEffect, useState} from "react";
import styles from './login.module.css'
import {Link, withRouter} from "react-router-dom";
import UserContext from "../../context/User/UserContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/free-solid-svg-icons'
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import GoogleLogin from "react-google-login";

const Login = (props) => {

    const auth = useContext(UserContext)

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false
    })

    useEffect(() => {
        auth.cleanErrors()
    }, [])


    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const loginHandler = async (event) => {
        event.preventDefault()
        const userData = {
            email: values.email,
            password: values.password
        }
        auth.login(userData, props.history, props.setupSocket)
    }

    const responseSuccessGoogle = async (response) => {
        auth.loginGoogle(response, props.history, props.setupSocket)
    }

    const responseErrorGoogle = () => {
        console.log('login Google failed')
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div>
                    <h1 className={styles.title}>Sign in</h1>
                </div>
                <form className={styles.formWrapper}>
                    <div className={styles.border}>
                        <div className={styles.field}>
                            <label className={styles.label}>Email</label>
                            <input className={styles.input} type="email" name={'email'}
                                   value={values.email} onChange={handleChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Password</label>
                            <div className={styles.fieldPass}>
                                <input className={styles.input}
                                       type={values.showPassword ? "text" : "password"}
                                       name={'password'}
                                       value={values.password} onChange={handleChange}
                                />
                                <div className={styles.fieldPassItem}
                                     onClick={handleClickShowPassword}
                                >
                                    {values.showPassword ?
                                        <FontAwesomeIcon icon={faEye}/> :
                                        <FontAwesomeIcon icon={faEyeSlash}/>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.linkForgot}>
                            <div className={styles.linkTextForgot}>
                                <span><Link to="/forgotPassword">forgot password?</Link></span>
                            </div>
                        </div>
                        {auth.errors && <div className={styles.errors}><span>{auth.errors}</span></div>}
                    </div>
                    <div className={styles.field}>
                        <button
                            className={styles.submit}
                            onClick={loginHandler}
                            disabled={auth.loading}
                        >
                            Sign in
                        </button>
                    </div>
                    <div className={styles.googleButton}>
                        <GoogleLogin
                            clientId="333550360272-m38ff1ba54kec3jfn8gb7aliuf47k3uh.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div className={styles.link}>
                        <div className={styles.linkText}>
                            don't have an account? sign up <span><Link to="/register"> here</Link></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login)