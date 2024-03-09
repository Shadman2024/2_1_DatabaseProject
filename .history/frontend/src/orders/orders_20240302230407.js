import React, { useState, useEffect } from 'react';
import styles from './orders.module.css'; 

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Shipping Info and Payment sections remain the same */}
          <div>
            <strong>Shipping Info:</strong>
            {/* Check for undefined shipping_info before accessing its properties */}
            <p>{order.shipping_info ? `${order.shipping_info.address_line1}, ${order.shipping_info.city}, ${order.shipping_info.division}, ${order.shipping_info.zip_code}` : 'Shipping information not available'}</p>
          </div>
          <div>
            <strong>Payment:</strong>
            {/* Check for undefined payment before accessing its properties */}
            <p>Method: {order.payment ? `${order.payment.method}, Amount: ${Number(order.payment.amount).toFixed(2)}` : 'Payment details not available'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
