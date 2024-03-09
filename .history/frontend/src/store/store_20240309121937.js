import React, { Fragment, useEffect, useState } from "react";
import styles from './store.module.css';

const OrdersForItem = ({ itemId, setAuth }) => {
    const [ordersByStatus, setOrdersByStatus] = useState({});

    useEffect(() => {
        const fetchOrdersForItem = async () => {
            try {
                const response = await fetch(`/api/orders/items/${itemId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const orders = await response.json();

                // Organize orders by status
                const ordersOrganizedByStatus = orders.reduce((acc, order) => {
                    const { status } = order;
                    if (!acc[status]) {
                        acc[status] = [];
                    }
                    acc[status].push(order);
                    return acc;
                }, {});

                setOrdersByStatus(ordersOrganizedByStatus);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrdersForItem();
    }, [itemId]);

    return (
        <Fragment>
            {Object.entries(ordersByStatus).map(([status, orders]) => (
                <div key={status} className={styles.ordersSection}>
                    <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                    {orders.map((order) => (
                        <div key={order.order_id} className={styles.order}>
                            <p>Order ID: {order.order_id}</p>
                            <p>Total Price: ${order.total_price}</p>
                            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                            {/* Render more order details as needed */}
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
    );
};

export default OrdersForItem;
