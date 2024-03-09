import React, { Fragment, useEffect, useState } from "react";
import styles from './store.module.css';

const OrdersForAllItems = ({ setAuth }) => {
    const [ordersByStatus, setOrdersByStatus] = useState({});

    useEffect(() => {
        fetchOrdersForAllItems();
    }, []);

    const fetchOrdersForAllItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/mylist/orders`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const orders = await response.json();
            organizeOrdersByStatus(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const organizeOrdersByStatus = (orders) => {
        const ordersOrganizedByStatus = orders.reduce((acc, order) => {
            const { status } = order;
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(order);
            return acc;
        }, {});
        setOrdersByStatus(ordersOrganizedByStatus);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/mylist/set/${orderId}/${newStatus}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization header if needed, e.g., 'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Optionally handle the response data
            fetchOrdersForAllItems(); // Refresh the orders list after updating the status
        } catch (error) {
            console.error(`Error updating order status:`, error);
        }
    };

    return (
        <Fragment>
            {Object.entries(ordersByStatus).map(([status, orders]) => (
                <div key={status} className={styles.ordersSection}>
                    <div className={styles.title}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
                    {orders.map((order) => (
                        <div key={order.order_id} className={styles.order}>
                            <p>Order ID: {order.order_id}</p>
                            <p>Total Price: ${order.total_price}</p>
                            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            {(status === 'placed' || status === 'confirmed') && (
                                <Fragment>
                                    <button onClick={() => updateOrderStatus(order.order_id, 'delivered')} className={styles.animated_button} style={{ marginRight: '10px' }}>Confirm</button>
                                    <button onClick={() => updateOrderStatus(order.order_id, 'cancelled')} className={styles.animated_button}>Cancel</button>
                                </Fragment>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
    );
};

export default OrdersForAllItems;
