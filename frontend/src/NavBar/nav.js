import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import styles from './nav.module.css';
import logo from './logo.png';
import cover from './new.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,faAddressCard,faRightToBracket,faUserPlus,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    // Check if the current route is the home page
    const isHomePage = location.pathname === '/Home' || location.pathname === '/'; // Adjust according to your routing
    
    // Apply conditional styling
    const containerStyle = isHomePage ? { height: '500px',paddingLeft:'250px',paddingRight:'250px'} : {};
    const containerStyle2 = isHomePage ? { marginTop:'200px' ,marginRight:'-400px',marginLeft:'-400px'} : {};

    return (
        <div className={`${isHomePage ? styles.cont2 : styles.inactiveClass} ${styles.cont}`} style={containerStyle}>
            <nav className={styles.navbar}>
                <Link className={styles.navbar_brand} to="/Home">
                    <img src={logo} alt="LOGO" height="100"></img>
                </Link>
                <form 
                    className={styles.search_bar_container} style={containerStyle2} 
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
                    >SEARCH
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" /></button>
                </form>
                {isHomePage && 
    <img src={cover} alt="Cover" style={{ position: 'absolute', top: 50, right: 250, height: '470px', objectFit: 'cover', zIndex: 0 }} />
}

                <div className={styles.collapse} >
                    <ul className={styles.navbar}>
                        <li className="nav_item">
                            <Link to="/cart" className={styles.animated_button}><span>CART</span>
                        <FontAwesomeIcon icon={faCartShopping} size="xl" style={{color: "#ffffff",}} />
                                <span></span></Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/menu" className={styles.animated_button}><span>DASHBOARD</span>
                        <FontAwesomeIcon icon={faAddressCard} size="xl" style={{color: "#ffffff",}} />
                                <span></span></Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/login" className={styles.animated_button}><span>LOG IN</span>
                            <FontAwesomeIcon icon={faRightToBracket} size="xl" style={{color: "#ffffff",}} />
                                <span></span></Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/signup" className={styles.animated_button}><span>SIGN UP</span>
                            <FontAwesomeIcon icon={faUserPlus} size="xl" style={{color: "#ffffff",}} />
                                <span></span></Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>

    )
};

export default NavBar;
