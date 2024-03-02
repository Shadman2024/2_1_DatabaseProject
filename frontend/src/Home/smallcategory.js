import React from "react";
import styles from './smallcategory.module.css';

const SmallCategory = ({ categoryName }) => {
    return (
        <div className={styles.wrapper}>
            <center>
                <button className={styles.animated_button}>
                    <span>{categoryName}</span>
                    <span></span>
                </button>
            </center>
        </div>
    );
};

export default SmallCategory;
