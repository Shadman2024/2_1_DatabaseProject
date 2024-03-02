import React, { Fragment, useState, useEffect } from 'react';
import styles from './dashboard.module.css'
import dp from '../dashboard/dp.png'
const Dashboard = ({ setAuth }) => {

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        optionalPhone: "",
    });

    const { first_name, middle_name, last_name, email, phone_number, optionalPhone } = formData;
    const getProfile = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {
                    token: localStorage.token
                }
            });
            const parseData = await res.json();
            //   console.log(parseData);
            if (res.ok) {
                // console.log(res.phone_number);
                setFormData({
                    first_name: parseData.first_name,
                    middle_name: parseData.middle_name,
                    last_name: parseData.last_name,
                    email: parseData.email,
                    phone_number: parseData.phone_number,
                    optionalPhone: parseData.phone_number2,
                    // password field is not updated since it's not typically included in profile data
                });
            } else {
                // Handle any errors, such as unauthorized access
                console.error("Failed to fetch profile data");
            }
            console.log(parseData);
            //   setName(parseData.user_name);
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);

    const logout = (e) => {
        e.preventDefault(); // Prevent form submission if it's inside a form
        localStorage.removeItem('token'); // Assuming the token is stored with the key 'token'
        setAuth(false); // Set the authentication state to false
    };
    return (
        <div>
            <div class={styles.container}>
                <div className={styles.user_info}>
                    <h2 className={styles.title}>Personal Information</h2>
                    <img src={dp} alt="User photo" className={styles.user_photo}></img>
                    <div className={styles.userDetail}>
                        <strong className={styles.detailLabel}>FIRST NAME:</strong>
                        <span className={styles.detailValue}>{first_name}</span>
                    </div>
                    <div className={styles.userDetail}>
                        <strong className={styles.detailLabel}>MIDDLE NAME:</strong>
                        <span className={styles.detailValue}>{middle_name}</span>
                    </div>
                    <div className={styles.userDetail}>
                        <strong className={styles.detailLabel}>LAST NAME:</strong>
                        <span className={styles.detailValue}>{last_name}</span>
                    </div>
                    <div className={styles.userDetail}>
                        <strong className={styles.detailLabel}>EMAIL:</strong>
                        <span className={styles.detailValue}>{email}</span>
                    </div>
                    <div className={styles.userDetail}>
                        <strong className={styles.detailLabel}>PHONE:</strong>
                        <span className={styles.detailValue}>{phone_number}</span>
                    </div>
                    <div className={styles.userDetail}>
                        <strong className={styles.detailLabel}>OPTIONAL PHONE:</strong>
                        <span className={styles.detailValue}>{optionalPhone}</span>
                    </div>
                    <button className={styles.animated_button} onClick={logout}>LOG OUT</button>
                </div>

                <div class={styles.order_info}>
                    <h2 className={styles.title}>Order Information</h2>
                    <p><strong>Order ID:</strong> 123456</p>
                    <p><strong>Item:</strong> Example Item</p>
                    <p><strong>Selling Price:</strong> $100</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 
