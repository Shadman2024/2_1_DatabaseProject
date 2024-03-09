import React, { useRef, useState, useEffect } from "react";
import _mini_miniItemPage from "../Item/_mini_miniItemPage";
import ItemBig from '../itemBig/itemBig'; 
import styles from './miniItemPage.module.css';
import defaultImage from "../Item/itemMini.webp"; 
import { useNavigate } from "react-router-dom";

const HeroCategory = () => {
    const wrapperRef = useRef(null);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/home/trending'); // Adjust the API URL as needed
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                // Ensure each item has a valid image link or uses the default image
                const itemsWithImage = data.map(item => ({
                    ...item,
                    image: item.image || defaultImage
                }));
                setItems(itemsWithImage);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleLeftClick = () => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft -= 600; // Adjust based on your layout
        }
    };

    const handleRightClick = () => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft += 600; // Adjust based on your layout
        }
    };

    const handleItemClick = (item) => {
        navigate('/itemExpand', { state: { item } });
    };

    return (
        <div className={styles.topCategories}>
            <div className={styles.title}>TRENDING NOW</div>
            <div className={styles.wrapperContainer}>
                <button className={`${styles.arrow} ${styles.left_arrow}`} onClick={handleLeftClick}>&#10094;</button>
                <div className={styles.wrapper} ref={wrapperRef}>
                    {items.map((item, index) => (
                        <div className={styles.item} key={index} onClick={() => handleItemClick(item)}>
                            <_mini_miniItemPage
                                item_id={item.item_id}
                                image={item.image} // Now guaranteed to have a valid image link
                                name={item.name}
                                price={item.price}
                                discount={item.discount}
                            />
                        </div>
                    ))}
                </div>
                <button className={`${styles.arrow} ${styles.right_arrow}`} onClick={handleRightClick}>&#10095;</button>
            </div>
            {selectedItem && (
                <ItemBig item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
};

export default HeroCategory;

