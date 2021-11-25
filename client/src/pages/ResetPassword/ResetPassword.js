import React, {useContext, useEffect, useState} from "react";
import styles from "./resetPassword.module.css";
import {Link, withRouter} from "react-router-dom";
import UserContext from "../../context/User/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


const ResetPassword = (props) => {

    const auth = useContext(UserContext)

    const [values, setValues] = useState({
        password: '',
        showPassword: false
    })

    useEffect(() => {
        auth.cleanErrors()
        auth.resetPassword(props.match.params.token)
    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const changePassword = async (event) => {
        event.preventDefault()
        const userData = {
            password: values.password,
            email: auth.resetEmail
        }
        auth.updatePasswordViaEmail(userData, props.history)
    }

    return (
        <>
            {auth.errorsReset ? <div>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <div>
                            <h2 className={styles.title}>Problem resetting password.
                                Please send another reset link.
                            </h2>
                        </div>
                        <div className={styles.field}>
                            <Link className={styles.submitLink} to="/">
                                <div>Go home</div>
                            </Link>
                        </div>
                        <div className={styles.field}>
                            <Link className={styles.submitLink} to="/forgotPassword">
                                <div>Forgot Password</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> : (
                <div className={styles.container}>
                    <div className={styles.form}>
                        <div>
                            <h1 className={styles.title}>Change Password</h1>
                        </div>
                        <form className={styles.formWrapper}>
                            <div className={styles.field}>
                                <label className={styles.label}>New password</label>
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
                            {auth.errors && <div className={styles.errors}><span>{auth.errors}</span></div>}
                            <div className={styles.field}>
                                <button
                                    className={styles.submit}
                                    onClick={changePassword}
                                    disabled={auth.loading}
                                >
                                    Submit
                                </button>
                            </div>
                            <div className={styles.link}>
                                <div className={styles.linkText}>
                                    back to login page <span><Link to="/login"> here</Link></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
export default withRouter(ResetPassword)