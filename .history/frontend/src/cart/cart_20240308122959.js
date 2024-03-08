import React, { useState, useEffect, Fragment } from 'react';
import styles from './cart.module.css';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [refresh, setRefresh] = useState(false); // New state to trigger re-fetching
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItems();
  }, [refresh]); // Depend on refresh state to re-trigger useEffect

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: "GET",
        headers: { token },
      });

      if (!response.ok) throw new Error('Failed to fetch cart items');

      const data = await response.json();
      const itemsWithParsedPrices = data.map(item => ({
        ...item,
        price: parseFloat(item.price),
      }));
      setCartItems(itemsWithParsedPrices);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({ quantity }),
      });

      // Trigger a re-fetch to update the UI after the quantity update
      setRefresh(!refresh); // Toggle the refresh state to force useEffect to run again
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/cart/${itemId}`, {
        method: 'DELETE',
        headers: { token },
      });

      // Trigger a re-fetch to update the UI after removing the item
      setRefresh(!refresh); // Toggle the refresh state to force useEffect to run again
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/shipping-info', { state: { cartItems } });
  };

  const calculateTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <Fragment>
      <div className={styles.cart_container}>
        <div className={styles.title}>Shopping Cart</div>
        <table className={styles.cart_table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.item_id}>
                <td>{item.name}</td>
                <td>
                  <button className={styles.button} onClick={() => updateItemQuantity(item.item_id, Math.max(1, item.quantity - 1))}>-</button>
                  {item.quantity}
                  <button className={styles.button} onClick={() => updateItemQuantity(item.item_id, item.quantity + 1)}>+</button>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className={styles.redbutton} onClick={() => removeItemFromCart(item.item_id)}>Remove</button>
                </td>
              </tr>
            ))}

          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3">Total</th>
              <td>${calculateTotal()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <button className={styles.animated_button} onClick={handleCheckout}>Checkout</button>
      </div>
    </Fragment>
  );
};

export default Cart;
