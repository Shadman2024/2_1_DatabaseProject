import React, { useState, useEffect, Fragment } from 'react';
import styles from './top.module.css';
import defaultimage from "../Item/itemMini.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const [items, setItems] = useState([]);
  const [timeFrame, setTimeFrame] = useState('Today');

  const renderStars = (rating) => {
    let stars = [];

    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={`star-filled-${i}`} icon={faStar} style={{ color: "darkcyan" }} />);
    }
    for (let i = rating; i < 5; i++) {
      stars.push(<FontAwesomeIcon key={`star-empty-${i}`} icon={faStar} style={{ color: "#ebf2ff", }} />);
    }
    return stars;
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/home/top/${timeFrame.toLowerCase()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch top-selling items');
        }
        const data = await response.json();
        setItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchItems();
  }, [timeFrame]);

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.topitem}>
          <div className={styles.title}>TOP ITEMS</div>
          <div className={styles.options}>
            <div 
              className={`${styles.optn} ${timeFrame === 'Today' ? styles.active : ''}`} 
              onClick={() => setTimeFrame('Today')}
            >
              Today
            </div>
            <div 
              className={`${styles.optn} ${timeFrame === 'This Week' ? styles.active : ''}`} 
              onClick={() => setTimeFrame('This Week')}
            >
              This Week
            </div>
          </div>
          <div className={styles.contentcontainer}>
            {items.map((item, index) => (
              <div key={index} className={styles.content}>
                <div className={styles.number}>{index + 1}</div>
                <div className={styles.image}><img src={item.image || defaultimage} className={styles.itemimage} alt={item.name} /></div>
                <div className={styles.details}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.rating}>
                    {renderStars(item.avg_star_rating)}
                  </div>
                  <div className={styles.ordered}>{item.order_count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
