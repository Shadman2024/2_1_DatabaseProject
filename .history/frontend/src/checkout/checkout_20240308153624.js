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
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paymentDetails = {
            fullName,
            addressLine1,
            addressLine2,
            city,
            division,
            zipCode,
            paymentMethod,
            amount,
            cartItems,
            // Add card details if payment method is Credit Card
            ...(paymentMethod === 'Credit Card' && {
                cardHolderName,
                cardNumber,
                expiryMonth,
                expiryYear,
                cvv,
            }),
        };
    };

    useEffect(() => {
        setAmount(calculateTotalAmount());
    }, [cartItems]);
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
    return (
        <div className={styles.container}>
            
                <div className={styles.container2}>
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
            <div className={styles.payment}>
                <div className={styles.title}>Payment Info</div>
                <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                    <div className={styles.formGroup}>
                        <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>
                    {paymentMethod === 'Credit Card' && (
                        <>
                            <input type="text" placeholder="Card Holder Name" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required />
                            <input type="text" placeholder="Card Number" maxLength="16" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                            <input type="text" placeholder="Expiry Month (MM)" maxLength="2" value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)} required />
                            <input type="text" placeholder="Expiry Year (YYYY)" maxLength="4" value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} required />
                            <input type="text" placeholder="CVV" maxLength="3" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                        </>
                    )}
                    <div className={styles.formGroup}>
                        <input type="text" id="amount" value={`$${amount}`} readOnly />
                    </div>
                    <button type="submit" className={styles.submitButton}>Place Order</button>
                </form>
            </div>
        </div>
        <div className={styles.container1}>
            <div className={styles.cartReview}>
                    <div className={styles.title}>Review Your Order</div>
                    <div>
                    <table className={styles.reviewTable}>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <div className={styles.totalAmount}>Total: ${amount}</div>
                </div>
                </div>
        </div>
    );
};

export default Checkout;

