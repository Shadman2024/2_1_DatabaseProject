import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './menu.module.css'; // Import CSS module

const Menu = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div>
        <Link to="/dashboard" className={styles.link}><button className={styles.button}>Profile</button></Link>
        <Link to="/orders" className={styles.link}><button className={styles.button}>Orders</button></Link>
        </div>
        <br/><br/>
        <div>
        <Link to="/addItems" className={styles.link}><button className={styles.button}>Sell Items</button></Link>
        <Link to="/myList" className={styles.link}><button className={styles.button}>My List</button></Link>
        <Link to="/store" className={styles.link}><button className={styles.button}>Your Store</button></Link>
        </div>
        <br/><br/>
        <div>
        <Link to="/messages" className={styles.link}><button className={styles.button}>Messages</button></Link>
        </div>

      </div></Fragment>
  );
};

export default Menu;
