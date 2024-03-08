import React, { useEffect, useState, Fragment } from 'react';
import styles from './itemBig.module.css';
import defaultImage from "../Item/itemMini.webp";
import { useLocation } from 'react-router-dom';
import _mini_miniItemPage from '../Item/_mini_miniItemPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDollarSign, faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

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
        unsplashImages: [],
        currentImageIndex: 0,
    });
    const { item } = location.state;
    const { item_id } = item.item_id;
    console.log(item.item_id);
    const [recommendedItems, setRecommendedItems] = useState([]);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {

            } catch (error) {
                console.error('Error:', error);
            }
        };
        const handleMessagesend = async () => {
            if (!isAuthenticated) {
                window.location.href = '/login'; // Redirect to login if not authenticated
                return;
            }

            const messageText = prompt("Enter your message to the seller:");
            if (messageText) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:5000/send-message/${item.item_id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Assuming your API uses Bearer token authentication
                        },
                        body: JSON.stringify({
                            message: messageText,
                            item_id: item.item_id, // Assuming the server needs item_id as part of the body
                            // user_id could be derived from token in the backend for sender's identity
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to send message');
                    }

                    alert('Message sent successfully');
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to send message');
                }
            }
        };
        const fetchRecommendedItems = async (category_name) => {
            try {
                const response = await fetch(`http://localhost:5000/additem/getitems/${category_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: localStorage.token,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch recommended items');
                }
                const data = await response.json();
                setRecommendedItems(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        if (item.item_id) {
            fetchItemDetails();
            // Call fetchRecommendedItems after itemDetails is set
            // For this example, let's assume itemDetails includes a category_name once fetched
            fetchRecommendedItems(itemDetails.category_name);
        }
}, [item.item_id, itemDetails.category_name]); // Ensure effect runs when category_name changes

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
            setItemDetails(prevDetails => ({ ...prevDetails, ...data }));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    if (item.item_id) {
        fetchItemDetails();
    }
}, [item.item_id]);
useEffect(() => {
    const fetchUnsplashImages = async () => {
        if (!itemDetails.item_name) return; // Ensure there's a name to search for
        
        const accessKey = 'uG-SeNJmzLR11udbsR_y8x_qP-1aZZSK9GmiZmi3haQ';
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(itemDetails.item_name)}&client_id=${accessKey}&per_page=4`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const imageUrls = data.results.map(result => result.urls.regular);
            setItemDetails(prevDetails => ({
                ...prevDetails,
                unsplashImages: imageUrls,
            }));
            console.log(response);
        } catch (error) {
            console.error('Error fetching images from Unsplash:', error);
        }
    };
    
    fetchUnsplashImages();
}, [itemDetails.item_name]);


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
    
    for (let i = 0; i < rating; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} />);
    }
    for (let i = rating; i < 5; i++) {
        stars.push(<FontAwesomeIcon icon={faStar} style={{ color: "#ebf2ff", }} />);
    }
    return stars;
};
const handleNextImage = () => {
    setItemDetails(prevDetails => ({
        ...prevDetails,
        currentImageIndex: (prevDetails.currentImageIndex + 1) % prevDetails.unsplashImages.length,
    }));
};

const handleprevImage = () => {
    setItemDetails(prevDetails => ({
        ...prevDetails,
        currentImageIndex: (prevDetails.currentImageIndex - 1) % prevDetails.unsplashImages.length,
    }));
    
};
    console.log(item);
    return (
        <div className={styles.maincontainer}>
            <div className={styles.container}>
                <div className={styles.containerleft}>
                    <img
                        src={itemDetails.unsplashImages[itemDetails.currentImageIndex] || defaultImage}
                        alt={item.name}
                        className={styles.image}
                    />
                    <div className={styles.changebuttons}>
                        {itemDetails.unsplashImages.length > 1 && (
                            <button onClick={handleprevImage} ><FontAwesomeIcon icon={faCircleChevronLeft} size="2xl" style={{ color: "#ffffff", }} /></button>
                        )}
                        {itemDetails.currentImageIndex + 1}/{itemDetails.unsplashImages.length}
                        {itemDetails.unsplashImages.length > 1 && (
                            <button onClick={handleNextImage} ><FontAwesomeIcon icon={faCircleChevronRight} size="2xl" style={{ color: "#ffffff", }} /></button>
                        )}
                    </div>
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
                    <button className={styles.animated_button} onClick={handleMessagesend}>
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
                        <div className={styles.seller_rating}>{itemDetails.user_rating * 20}%</div>
                        <div className={styles.seller_allgoods}>All Goods</div>
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
                    <div className={styles.contItem}>
                        {recommendedItems.length > 0 ? recommendedItems.map((recommendedItem) => (
                            <_mini_miniItemPage
                                key={recommendedItem.item_id}
                                item_id={recommendedItem.item_id}
                                image={recommendedItem.image || defaultImage}
                                name={recommendedItem.name}
                                price={recommendedItem.price}
                                discount={recommendedItem.discount}
                            />
                        )) : <p>No recommendations available</p>}
                    </div>
                </div>

            </div>
        </div >
    );
};

export default ItemBig;
