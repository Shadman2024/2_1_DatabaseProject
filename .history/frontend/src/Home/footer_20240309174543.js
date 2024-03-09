import React, { Fragment, useState, useEffect } from "react";
import styles from './footer.module.css';



const footer = () => {
  
  return (
    <Fragment>
        <div className={styles.container}>
            <div className={styles.man}>
              <div className={styles.title}>MD MEHEDI HASAN MIM</div>
              <div className={styles.title}>Department Of Comupter Science And Engineering</div>
              <div className={styles.title}>Bangladesh University Of Engineering And Technology</div>
              <div className={styles.title}>Student Id: 2105142</div>
            </div>
            
        </div>
    </Fragment>
  );
};

export default footer;
