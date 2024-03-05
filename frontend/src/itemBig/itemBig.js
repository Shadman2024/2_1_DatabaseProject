import React, { Fragment } from 'react';
import styles from './itemBig.module.css';
import defaultImage from "../Item/itemMini.webp";
import { useLocation } from 'react-router-dom';

const ItemBig = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const location = useLocation();

    const { item } = location.state;
    const defaultQuantity = 1;
    const addToCart = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:5000/items/cart/add/${item.item_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    quantity: defaultQuantity
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
            addToCart(item.id, defaultQuantity);
        } else {
            window.location.href = '/login';
        }
    };
    console.log(item);
    // return (
    //     <Fragment>
    //         <div className={styles.container}>
    //             <div className={styles.item}>
    //                 <div className={styles.mainItem}>
    //                     <div className={styles.image}>
    //                         <img src={item.image || defaultImage} alt={item.name} />
    //                     </div>
    //                     <div className={styles.details}>
    //                         <h2>{item.name}</h2>
    //                         <div className={styles.itemLeft}>5star</div>
    //                         <p>Price: ${item.price}</p>
    //                         <p>Quantity: {item.quantity}</p>
    //                         <button className={styles.animated_button} onClick={handleButtonClick}>
    //                             {isAuthenticated ? 'Add to Cart' : 'Log In To Add To Cart'}
    //                         </button>
    //                     </div>
    //                     <div className={styles.userinfo}>Seller:</div>
    //                     <div className={styles.userinfo}>Seller review:</div>
    //                     <div className={styles.userinfo}>chat with user:</div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div>Container2</div>
    //     </Fragment>
    // );
    return (
        <div className={styles.maincontainer}>
            <div className={styles.container}>
                <div className={styles.containerleft}>
                    <img src={item.image || defaultImage} alt={item.name} />
                    </div>
                <div className={styles.containermiddle}></div>
                <div className={styles.containerright}></div>
            </div>
            <div className={styles.container2}>
                <div className={styles.container2left}></div>
                <div className={styles.container2right}></div>
            </div>
        </div>
    );
};

export default ItemBig;
