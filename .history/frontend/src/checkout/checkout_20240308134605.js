import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './checkout.module.css';

const Checkout = ({ setAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };

    // States for form inputs
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the order to your backend server
        // For this example, we'll just log it to the console and navigate to a confirmation page
        console.log({
            name,
            address,
            paymentMethod,
            cartItems,
        });
        // navigate('/order-confirmation'); // Assuming you have an order confirmation page
    };

    return (
        <Fragment>
            <div className={styles.checkoutContainer}>
                <div className={styles.title}></div>
                <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Payment Method:</label>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                            <option value="creditCard">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="cash">Cash on Delivery</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton}>Place Order</button>
                </form>
            </div>
        </Fragment>
    );
};

export default Checkout;

