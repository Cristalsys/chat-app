import React, {useContext, useEffect, useState} from "react";
import styles from './register.module.css'
import {Link, withRouter} from "react-router-dom";
import UserContext from "../../context/User/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


const Register = (props) => {

    const auth = useContext(UserContext)

    const [fileInputState, setFileInputState] = useState('');
    const [userAvatar, setUserAvatar] = useState('')

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false
    })

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileInputState(e.target.value);

        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const newImage = {
                avatar: reader.result
            };
            setUserAvatar(newImage.avatar)

        };
    }

    useEffect(() => {
        auth.cleanErrors()
    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }


    const registerHandler = async (event) => {
        event.preventDefault()
        const userData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            avatar: userAvatar
        }
        auth.register(userData, props.history, props.setupSocket)
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div>
                    <h1 className={styles.title}>Sign up</h1>
                </div>
                <form className={styles.formWrapper}>
                    <div className={styles.border}>
                        <div className={styles.field}>
                            <label className={styles.label}>First Name</label>
                            <input className={styles.input} type="text" name={'firstName'}
                                   value={values.firstName} onChange={handleChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Last Name</label>
                            <input className={styles.input} type="text" name={'lastName'}
                                   value={values.lastName} onChange={handleChange}
                            />
                        </div>
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
                        <div className={styles.registerImage}>
                            <label className={styles.registerImageLabel}>Select image </label>
                            <input type="file" onChange={handleImageChange}
                                   value={fileInputState}/>
                        </div>
                        {auth.errors && <div className={styles.errors}><span>{auth.errors}</span></div>}
                    </div>
                    <div className={styles.field}>
                        <button
                            className={styles.submit}
                            onClick={registerHandler}
                            disabled={auth.loading}
                        >
                            Sign up
                        </button>
                    </div>
                    <div className={styles.link}>
                        <div className={styles.linkText}>
                            already have an account? sign in
                            <span><Link to="/login"> here</Link></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default withRouter(Register)