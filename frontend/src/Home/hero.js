import React, { Fragment, useState, useEffect } from "react";
import styles from './hero.module.css';



// Import your images
import img1 from '../components/hero2_.png';
import img2 from '../components/hero3_.png';
import img3 from '../components/img1.png';

const images = [img1,img2,img3];

const Hero = () => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx(prevIdx => (prevIdx + 1) % images.length); // Cycle through images
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <Fragment>
      <div className={styles.hero}>
        <div className={styles.hero_left}>
          <img src={images[currentImageIdx]} alt="Hero Slide" className={styles.image} />
        </div>
        <div className={styles.hero_right}>
          {/* Other content */}
          
        </div>
        
      </div>
    </Fragment>
  );
};

export default Hero;
