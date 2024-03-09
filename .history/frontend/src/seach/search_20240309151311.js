import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './search.module.css';
import _mini_miniItemPage from '../Item/_mini_miniItemPage';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [categoryName, setCategoryName] = useState('');
    const [star_rating, setstar_rating] = useState('');
    const [sort, setSort] = useState('');
    const [results, setResults] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const maxRange = 10000;
    const priceGap = 1000;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            console.log(token);
        }
    }, []);


    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    const [categories, setCategories] = useState([]);
    const updateProgressBar = () => {
        const progressLeft = (minPrice / maxRange) * 100;
        const progressRight = 100 - (maxPrice / maxRange) * 100;
        return { left: `${progressLeft}%`, right: `${progressRight}%` };
    };

    // Handle changes to the min price input
    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - priceGap);
        setMinPrice(value);
    };

    // Handle changes to the max price input
    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + priceGap);
        setMaxPrice(value);
    };

    // Handle changes to the range inputs
    const handleRangeChange = (minVal, maxVal) => {
        if (maxVal - minVal < priceGap) {
            if (minVal === minPrice) {
                setMaxPrice(minVal + priceGap);
            } else {
                setMinPrice(maxVal - priceGap);
            }
        } else {
            setMinPrice(minVal);
            setMaxPrice(maxVal);
        }
    };

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/search/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };

        fetchCategories();
    }, []);
    useEffect(() => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (categoryName) params.append('categoryName', categoryName);
        if (star_rating) params.append('star_rating', star_rating);
        if (sort) params.append('sort', sort);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (user) {
            params.append('user', user.user);
        }
        const fetchResults = async () => {
            try {
                const url = `http://localhost:5000/search?${params.toString()}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        token: localStorage.token,
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchResults();
    }, [query, categoryName, star_rating, sort, minPrice, maxPrice, user]);
    const unicodeStars = (count) => {
        const starSymbol = '★'; // Unicode character for a solid star
        return starSymbol.repeat(count);
      };
      const handleItemClick = (item) => {
        navigate('/itemExpand', { state: { item } });
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.title}>Filters</div>

                <select className={styles.select} onChange={(e) => setCategoryName(e.target.value)} value={categoryName}>
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                    ))}
                </select>


                <div className={styles.slidercontainer}>
                    <h3>Price range</h3>
                    <div className={styles.price_input}>
                        <div className={styles.field}>
                            <span>Min</span>
                            <input type="number" className={styles.input_min} value={minPrice} onChange={handleMinPriceChange} />
                        </div>
                        <div className={styles.separator}>-</div>
                        <div className={styles.field}>
                            <span>Max</span>
                            <input type="number" className={styles.input_max} value={maxPrice} onChange={handleMaxPriceChange} />
                        </div>
                    </div>
                    <div className={styles.slider}>
                        <div className={styles.progress} style={updateProgressBar()}></div>
                    </div>
                    <div className={styles.range_input}>
                        <input type="range" className={styles.range_min} min="0" max="10000" value={minPrice} step="100" onChange={(e) => handleRangeChange(parseInt(e.target.value), maxPrice)} />
                        <input type="range" className={styles.range_max} min="0" max="10000" value={maxPrice} step="100" onChange={(e) => handleRangeChange(minPrice, parseInt(e.target.value))} />
                    </div>


                </div>
                <select className={styles.select} onChange={(e) => setstar_rating(e.target.value)} value={star_rating}>
                    <option value="">Select star_rating</option>

                         {[1, 2, 3, 4, 5].map(star => <option key={star} value={star}>{unicodeStars(star)}</option>)}

                </select>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.resultsHeader}>
                    <div className={styles.topcontainer}>
                        <h2>Search Results for: {query}</h2>
                        <select className={styles.sortSelect} onChange={(e) => setSort(e.target.value)} value={sort}>
                            <option value="">Sort By</option>
                            <option value="discount">Discount</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                </div>
                <div className={styles.contItem}>
                        {recommendedItems.length > 0 ? recommendedItems.map((recommendedItem, index) => (
                            <div className={styles.item} key={index} onClick={() => handleItemClick(recommendedItem)}>
                                <_mini_miniItemPage
                                    item_id={recommendedItem.item_id}
                                    image={recommendedItem.image} // Assuming a valid image link is always provided
                                    name={recommendedItem.name}
                                    price={recommendedItem.price}
                                    discount={recommendedItem.discount}
                                />
                            </div>
                        )) : <p>No recommendations available</p>}
                    </div>
            </div>
        </div>
    );
}

export default SearchResults;
