import React from "react";
import { useHistory,Link } from 'react-router-dom';
import styles from './nav.module.css';


import logo from './logo.png'
const NavBar = () => {
    return (
        <div className={styles.cont} style={{  }}>
            <nav className={styles.navbar}>
                <Link className={styles.navbar_brand} to="/Home">
                    <img src={logo} alt="LOGO" height="50"></img>
                </Link>
                <div class={styles.search_bar_container}>
                        <select class={styles.dropdown}>
                            <option value="option1">Search In</option>
                            <option value="option1">Products</option>
                            <option value="option2">Category</option>
                            <option value="option3">OPTION 3</option>
                            <span>Mouse over me</span>
                        </select>
                        <input type="text" class={styles.search_input} placeholder="Search...">

                        </input>
                        <button type="submit" class={styles.search_button}>SEARCH</button>
                    </div>
                <div className={styles.collapse} >
                    <ul className={styles.navbar}>
                        <li className="nav_item">
                            <Link to="/cart" className={styles.animated_button}><span>CART</span>
                                <span></span></Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/menu" className={styles.animated_button}><span>DASHBOARD</span>
                                <span></span></Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/login" className={styles.animated_button}><span>LOG IN</span>
                                <span></span></Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/signup" className={styles.animated_button}><span>SIGN UP</span>
                                <span></span></Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>

    )
};

export default NavBar;
