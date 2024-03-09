import React, { useState, useEffect } from "react";
import _mini_miniItemPage from "../Item/_mini_miniItemPage";
import styles from './allItem.module.css';
import defaultImage from "../Item/itemMini.webp";
import { useNavigate } from "react-router-dom";
const HeroCategory = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/home/onlyforyou');
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
        navigate('/itemExpand', { state: { item } });
    };


    return (
        <div className={styles.topCategories}>
            <div className={styles.title}>ONLY FOR YOU</div>
            <div className={styles.wrapperContainer}>
                <div className={styles.wrapper}>
                    {items.map((item, index) => (
                        <div className={styles.item} onClick={() => handleItemClick(item)}>
                            <_mini_miniItemPage
                                image={item.image || defaultImage}
                                name={item.name}
                                price={item.price}
                                discount={item.discount}
                            />
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCategory;
