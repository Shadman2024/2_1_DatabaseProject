import React, { useState, useEffect } from 'react';
import styles from './orders.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/orders/', {
          method: "GET",
          headers: { token },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setOrders(jsonData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
    for (let i = rating; i < 5; i++) {
      stars.push(<FontAwesomeIcon key={i + 5} icon={faStar} style={{ color: "#d7c0ed" }} />);
    }
    return stars;
  };

  const submitReview = async (itemId, reviewContent, starRating) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          item_id: itemId,
          content: reviewContent,
          star_rating: starRating,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle successful review submission here (e.g., show a message)
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const unicodeStars = (count) => {
    const starSymbol = '★'; // Unicode character for a solid star
    return starSymbol.repeat(count);
  };

  return (
    <div className={styles.orders_container}>
      <h2 className={styles.title}>My Orders</h2>
      {orders.map((order, index) => (
        <div key={index} className={styles.order}>
          <h3>Order #{order.id} - Status: {order.status}</h3>
          <p>Date: {order.created_at}</p>
          <p>Total Price: ${Number(order.total_price).toFixed(2)}</p>
          <div>
            <strong>Items:</strong>
            <table className={styles.orders_table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${Number(item.price).toFixed(2)}</td>
                    {/* Conditionally render the review section for delivered orders */}
                    {order.status === "delivered" && (
                      <td>
                        <input
                          type="text"
                          placeholder="Write a review..."
                          onChange={(e) => item.reviewContent = e.target.value}
                        />
                        <select
                          onChange={(e) => item.starRating = parseInt(e.target.value, 10)}
                          defaultValue={0}
                        >
                          <option value={0} disabled>Rate...</option>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>{unicodeStars(star)}</option>
                          ))}
                        </select>
                        <button onClick={() => submitReview(item.id, item.reviewContent, item.starRating)}>Submit Review</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <strong>Shipping Info:</strong>
            <p>{order.shipping_info ? `${order.shipping_info.address_line1}, ${order.shipping_info.city}, ${order.shipping_info.division}, ${order.shipping_info.zip_code}` : 'Shipping information not available'}</p>
          </div>
          <div>
            <strong>Payment:</strong>
            <p>Method: {order.payment ? `${order.payment.method}, Amount: ${Number(order.payment.amount).toFixed(2)}` : 'Payment details not available'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
