import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './checkout.module.css';
import jwtDecode from 'jwt-decode'; 
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
    const token = localStorage.getItem('token');
    let user_id = null;
    if (token) {
        const decoded = jwtDecode(token);
        user_id = decoded.userId; // Assuming your token payload has a userId field
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Calculate the total amount based on cart items
        const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // Prepare the data to send
        const orderData = {
            // Assuming you have the user's ID stored somewhere, e.g., in the state, local storage, or context
            total_price: totalAmount,
            cartItems: cartItems,
            shippingInfo: {
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                division: division,
                zipCode: zipCode,
                shippingDate: new Date().toISOString(), // Or any date you choose
            },
            paymentInfo: {
                amount: totalAmount,
                paymentMethod: paymentMethod,
            },
            cardInfo: paymentMethod === 'Credit Card' ? {
                cardHolderName: cardHolderName,
                cardNumber: cardNumber,
                expiryMonth: expiryMonth,
                expiryYear: expiryYear,
                cvv: cvv,
            } : null
        };
        console.log(orderData);

        try {
            const response = await fetch('http://localhost:5000/cart/complete-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.token,
                },
                body: JSON.stringify(orderData)
            });

            console.log(response);
            if (response.ok) {
                const result = await response.json();
                console.log(result); // Process the response from the server
                navigate('/order-confirmation', { state: { orderId: result.orderId } }); // Redirect to a confirmation page
            } else {
                throw new Error('Failed to place the order');
            }
        } catch (error) {
            console.error('Error placing the order:', error);
        }
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
                    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                    <div className={styles.title}>Shipping Info</div>
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
                        <button type="submit" className={styles.animated_button}>Place Order</button>
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

