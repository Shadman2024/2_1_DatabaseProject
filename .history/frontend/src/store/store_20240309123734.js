import React, { Fragment, useEffect, useState } from "react";
import styles from './store.module.css';

// Assuming the setAuth prop is for authentication handling elsewhere in your app
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
            console.error('Error fetching orders for all items:', error);
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
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}/${newStatus}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Optionally handle the response data
            fetchOrdersForAllItems(); // Refresh orders list after updating status
        } catch (error) {
            console.error(`Error updating order status:`, error);
        }
    };

    return (
        <Fragment>
            {Object.entries(ordersByStatus).map(([status, orders]) => (
                <div key={status} className={styles.ordersSection}>
                    <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                    {orders.map((order) => (
                        <div key={order.order_id} className={styles.order}>
                            <p>Order ID: {order.order_id}</p>
                            <p>Total Price: ${order.total_price.toFixed(2)}</p>
                            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            {['placed', 'confirmed', 'shipped'].includes(status) && ( // Assuming these are the statuses where actions are applicable
                                <Fragment>
                                    <button onClick={() => updateOrderStatus(order.order_id, 'confirmed')} style={{ marginRight: '10px' }}>Confirm</button>
                                    <button onClick={() => updateOrderStatus(order.order_id, 'cancelled')}>Cancel</button>
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
