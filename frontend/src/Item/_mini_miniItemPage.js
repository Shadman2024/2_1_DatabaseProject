import React from "react";
import styles from '../Item/_mini_miniItemPage.module.css';


const _mini_miniItemPage = ({ item_id, image, name, price, discount }) => {
    return (
        <div className={styles.item}>
            <img src={image} alt={name} className={styles.item_image} />
            <div className={styles.item_details}>
                <h2 className={styles.item_name}>{name}</h2>
                <p className={styles.item_price}>&#2547; {price}</p>
                <p className={styles.item_discount}>Discount: {discount}%</p>
            </div>
        </div>
    );
};


export default _mini_miniItemPage;
