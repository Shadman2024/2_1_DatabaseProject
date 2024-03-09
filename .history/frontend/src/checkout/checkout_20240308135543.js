import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './checkout.module.css';

const Checkout = ({ setAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };

    // States for form inputs
    const [fullName, setFullName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [division, setDivision] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the order to your backend server
        // For this example, we'll just log it to the console and navigate to a confirmation page
        console.log({
            address,
            paymentMethod,
            cartItems,
        });
        // navigate('/order-confirmation'); // Assuming you have an order confirmation page
    };

    return (
        <div className={styles.container}>
            <div className={styles.shipping}>
                <div className={styles.title}>Shipping Info</div>
                <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
                    <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    <input type="text" placeholder="State/Province/Division" value={division} onChange={(e) => setDivision(e.target.value)} required />
                    <input type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                </form>
            </div>
            {/* <div className={styles.payment}>
                <div className={styles.title}>Payment Info</div>
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
            </div> */}
        </div>
    );
};

export default Checkout;

