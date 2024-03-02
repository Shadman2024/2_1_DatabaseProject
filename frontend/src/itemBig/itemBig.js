import React from 'react';
import styles from './itemBig.module.css';
import defaultImage from "../Item/itemMini.webp";

const ItemBig = ({ item, onClose }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    // Assume default quantity as 1 or based on user selection
    const defaultQuantity = 1;

    const addToCart = async () => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`http://localhost:5000/items/cart/add/${item.item_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token // Correct way to set the token header
                },
                body: JSON.stringify({
                    quantity: defaultQuantity // Now passing quantity correctly
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            alert('Item added to cart successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleButtonClick = () => {
        if (isAuthenticated) {
            addToCart(item.id, defaultQuantity); // Now passing itemId and quantity
        } else {
            window.location.href = '/login'; // Redirect to login
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.closeButton} onClick={onClose}>X</div>
            <div className={styles.item}>
                <div className={styles.mainItem}>
                    <div className={styles.image}>
                        <img src={item.image || defaultImage} alt={item.name} />
                    </div>
                    <div className={styles.details}>
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button className={styles.animated_button} onClick={handleButtonClick}>
                            {isAuthenticated ? 'Add to Cart' : 'Log In To Add To Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemBig;
