import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './search.module.css';
import _mini_miniItemPage from '../Item/_mini_miniItemPage';
function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [sort, setSort] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (category) params.append('category', category);
        if (price) params.append('price', price);
        if (rating) params.append('rating', rating);
        if (sort) params.append('sort', sort);

        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:5000/search?${params.toString()}`);
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
    }, [query, category, price, rating, sort]);

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.title}>Filters</div>
                <select className={styles.select} onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">Select Category</option>
                </select>
                <select className={styles.select} onChange={(e) => setPrice(e.target.value)} value={price}>
                    <option value="">Select Price Range</option>
                </select>
                <select className={styles.select} onChange={(e) => setRating(e.target.value)} value={rating}>
                    <option value="">Select Rating</option>
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
                    <div className={styles.itemcontainer}>
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <div className={styles.item} key={index} >
                                <_mini_miniItemPage
                                    key={result.item_id || index} 
                                    image={result.image}
                                    name={result.name}
                                    price={result.price}
                                    discount={result.discount}
                                />
                                </div>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
