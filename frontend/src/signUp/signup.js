import React, { Fragment, useState } from "react";
import styles from './signup.module.css'

const SignUp = ({setAuth}) => {
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: ""
    });

    const { first_name, middle_name, last_name, phone_number, email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { first_name, middle_name, last_name, phone_number, email, password };
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if (response.ok) {
                // Redirect or handle successful submission
                localStorage.setItem('token',parseRes.token);
                setAuth(true);
                window.location = "/";
            } else {
                // Handle errors
                console.error("Failed to sign up.");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.login_box}>
                    <p className={styles.headname}>REGISTRATION FORM</p>
                    <form onSubmit={onSubmitForm} className={styles.formName}>
                        <div className={styles.user_box}>
                            <input
                                type="text"
                                name="first_name"
                                required
                                value={first_name}
                                onChange={onChange}
                            />
                            <label htmlFor="first_name">FIRST NAME</label>
                        </div>
                        <div className={styles.user_box}>
                            <input
                                type="text"
                                name="middle_name"
                                required
                                value={middle_name}
                                onChange={onChange}
                            />
                            <label htmlFor="middle_name">MIDDLE NAME</label>
                        </div>
                        <div className={styles.user_box}>
                            <input
                                type="text"
                                name="last_name"
                                required
                                value={last_name}
                                onChange={onChange}
                            />
                            <label htmlFor="last_name">LAST NAME</label>
                        </div>
                        <div className={styles.user_box}>
                            <input
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={onChange}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Please enter a valid email address"
                            />
                            <label htmlFor="email">EMAIL</label>
                        </div>
                        <div className={styles.user_box}>
                            <input
                                type="number"
                                name="phone_number"
                                required
                                value={phone_number}
                                onChange={onChange}
                                pattern="\d{10}"
                                title="Phone number should be 10 digits"
                            />
                            <label htmlFor="phone_number">PHONE NUMBER</label>
                        </div>
                        <div className={styles.user_box}>
                            <input
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={onChange}
                            />
                            <label htmlFor="password">PASSWORD</label>
                        </div>
                        <center>
                            <button className={styles.animated_button}>
                                <span>SUBMIT</span>
                                <span></span>
                            </button>
                        </center>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUp;
