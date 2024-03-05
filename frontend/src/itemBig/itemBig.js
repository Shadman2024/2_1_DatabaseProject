import React, { useEffect, useState, Fragment } from 'react';
import styles from './itemBig.module.css';
import defaultImage from "../Item/itemMini.webp";
import { useLocation } from 'react-router-dom';

const ItemBig = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const location = useLocation();
    const [itemDetails, setItemDetails] = useState({
        item_id: '',
        item_name: '',
        description: '',
        image: '',
        price: '',
        category_name: '',
        subcategory_name: '',
        user_id: '',
        seller_name: '',
        email: '',
        phone_number: '',
        average_rating: '',
    });
    const { item } = location.state;
    const { item_id } = item.item_id;
    console.log(item.item_id);
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const { item } = location.state;
                console.log("II ", item.item_id);
                const response = await fetch(`http://localhost:5000/additem/getDetails/${item.item_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: localStorage.token,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch item details');
                }
                const data = await response.json();
                setItemDetails(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (item.item_id) {
            fetchItemDetails();
        }
    }, [item.item_id]);

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
    const renderStars = (rating) => {
        let stars = [];
        // Add filled stars for the rating
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={`filled_${i}`} style={{ color: 'rgb(30,40,50)' }}>&#9733;</span>); // Filled star
        }
        // Add unfilled stars for the rest up to 5
        for (let i = rating; i < 5; i++) {
            stars.push(<span key={`unfilled_${i}`} style={{ color: 'white' }}>&#9733;</span>); // Unfilled star
        }
        return stars;
    };
    console.log(item);
    return (
        <div className={styles.maincontainer}>
            <div className={styles.container}>
                <div className={styles.containerleft}>
                    <img src={item.image || defaultImage} alt={item.name} className={styles.image} />
                    <div></div>
                </div>
                <div className={styles.containermiddle}>
                    <h2>{item.name}</h2>
                    <div className={styles.itemrating}>
                        {itemDetails && renderStars(itemDetails.average_rating)}
                    </div>
                   <div className={styles.discounted_price}> ${itemDetails.discounted_price}</div>
                    <div className={styles.old_price}>
                        <div className={styles.lined}>${itemDetails.old_price}</div>
                        <div>-{itemDetails.discount}%</div>
                        </div>
                    <p>Quantity: {item.quantity}</p>
                    <button className={styles.animated_button} onClick={handleButtonClick}>
                        {isAuthenticated ? 'Add to Cart' : 'Log In To Add To Cart'}
                    </button>
                    <button className={styles.animated_button} onClick={handleButtonClick}>
                        {'Chat With The Seller'}
                    </button>
                </div>
                <div className={styles.containerright}>
                    <div className={styles.sellerdetails}>
                        <h4>Sold By:</h4>
                        <h4>{itemDetails.seller_name}</h4>
                        <button className={styles.animated_button} onClick={handleButtonClick}>
                            {'Chat'}
                        </button>
                        <h4>positive Seller Ratings</h4>
                        <div className={styles.seller_rating}>99%</div>
                        <div className={styles.seller_rating}>All Goods</div>
                    </div>
                </div>
            </div>
            <div className={styles.container2}>
                <div className={styles.container2left}>
                    <div className={styles.title}>
                        <h3>Product details of {itemDetails.item_name}</h3>
                    </div>
                    <div>{itemDetails.description}</div>
                    <br></br>
                    <br></br>
                    <div className={styles.title}>
                        <h3>Ratings & Reviews</h3>
                    </div>
                </div>
                <div className={styles.container2right}>

                    <div className={styles.title}>
                        <h3>You May Want To See</h3>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ItemBig;
