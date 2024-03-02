import React, { useState, useEffect } from "react";
import _mini_miniItemPage from "../Item/_mini_miniItemPage";
import ItemBig from '../itemBig/itemBig'; // Ensure this path is correct
import styles from './allItem.module.css';
import defaultImage from "../Item/itemMini.webp";

const HeroCategory = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/home/trending');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    // Function to handle item click
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className={styles.topCategories}>
            <div className={styles.title}>ONLY FOR YOU</div>
            <div className={styles.wrapperContainer}>
                <div className={styles.wrapper}>
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className={styles.item} onClick={() => handleItemClick(item)}>
                                <_mini_miniItemPage
                                    image={item.image || defaultImage}
                                    name={item.name}
                                    price={item.price}
                                    discount={item.discount}
                                />
                            </div>
                            {/* Render ItemBig just after the selected item */}
                            {selectedItem === item && (
                                <ItemBig item={selectedItem} onClose={() => setSelectedItem(null)} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCategory;
