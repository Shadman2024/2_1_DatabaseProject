import React, { Fragment } from "react";
import image from '../components/hero3_.png';
import styles from './hero3.module.css'
const Hero3 = () => {
    return (
        <Fragment>
            <div className={styles.hero}>
            
                <div className={styles.hero_left}>
                    <h2>Trade With Trust</h2>
                    <div>
                        <div className={styles.hand_hand_icon}>
                            <p>buy,sell &</p>
                        </div>
                        <p>beyond</p>
                        <p>for everyone</p>
                    </div>
                    <div className={styles.hero_latest_btn}>
                        <button className={styles.learn_more}>
                            <span className={styles.circle} aria_hidden="true">
                                <span className={styles.icon}></span>
                            </span>
                            <span className={styles.button_text}>TRADE NOW</span>
                        </button>
                    </div>
                    
                </div>
                <div className={styles.hero_right}>
                    <img src={image} alt="IMAGE"></img>
                </div>
            </div>
        </Fragment>
    )
}
export default Hero3;