import React, { useState } from "react";
import { useHistory,Link } from 'react-router-dom';
import styles from './nav.module.css';


import logo from './logo.png'
const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (
        <div className={styles.cont} style={{  }}>
            <nav className={styles.navbar}>
                <Link className={styles.navbar_brand} to="/Home">
                    <img src={logo} alt="LOGO" height="50"></img>
                </Link>
                <form 
                    className={styles.search_bar_container} 
                    action={`/search?query=${encodeURIComponent(searchQuery)}`} 
                    method="GET"
                >
                    <input 
                        type="text" 
                        className={styles.search_input} 
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        name="query"
                    />
                    <button 
                        type="submit" 
                        className={styles.search_button_}
                    >SEARCH</button>
                </form>
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
