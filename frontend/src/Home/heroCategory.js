import React, { Fragment, useRef, useState, useEffect } from "react";
import SmallCategory from "./smallcategory";
import styles from './herocategory.module.css';

const HeroCategory = () => {
    const wrapperRef = useRef(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/home/all_category');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setCategories(data); // Assuming the backend sends an array of category names
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleLeftClick = () => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft -= 300;
        }
    };

    const handleRightClick = () => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft += 300;
        }
    };

    return (
        <Fragment>
            <div className={styles.topCategories}>
                <div className={styles.title}>TOP CATEGORIES</div>
                <div className={styles.wrapperContainer}>
                    <div className={`${styles.arrow} ${styles.left_arrow}`} onClick={handleLeftClick}>&#10094;</div>
                    <div className={styles.wrapper} ref={wrapperRef}>
                        <div className={styles.cont}>
                        {categories.map((category, index) => (
                            <div className={styles.item} key={index}>
                                <SmallCategory categoryName={category.name} />
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className={`${styles.arrow} ${styles.right_arrow}`} onClick={handleRightClick}>&#10095;</div>
                </div>
            </div>
        </Fragment>
    );
};

export default HeroCategory;
