import React, {useContext, useEffect, useState} from "react";
import styles from "./forgotPassword.module.css";
import {Link, withRouter} from "react-router-dom";
import UserContext from "../../context/User/UserContext";

const ForgotPassword = (props) => {

    const auth = useContext(UserContext)

    const [values, setValues] = useState({
        email: ''
    })

    useEffect(() => {
        auth.cleanErrors()
    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const forgotPassword = async (event) => {
        event.preventDefault()
        const userData = {
            email: values.email
        }
        auth.forgotPassword(userData, props.history)
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div>
                    <h1 className={styles.title}>Reset Password</h1>
                </div>
                <form className={styles.formWrapper}>
                    <div className={styles.border}>
                        <div className={styles.field}>
                            <label className={styles.label}>Email</label>
                            <input className={styles.input} type="email" name={'email'}
                                   value={values.email} onChange={handleChange}
                            />
                        </div>
                        {auth.errors && <div className={styles.errors}><span>{auth.errors}</span></div>}
                    </div>
                    <div className={styles.field}>
                        <button
                            className={styles.submit}
                            onClick={forgotPassword}
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
    )
}
export default withRouter(ForgotPassword)