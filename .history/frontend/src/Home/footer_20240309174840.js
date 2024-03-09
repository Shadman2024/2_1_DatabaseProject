import React, { Fragment, useState, useEffect } from "react";
import styles from './footer.module.css';

import { useNavigate } from 'react-router-dom';

const footer = () => {
  

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/your-internal-path');
  };
  return (
    <Fragment>
       <div className={styles.container}>
      <div className={styles.man}>
        <div className={styles.title}>MD MEHEDI HASAN MIM</div>
        <div className={styles.title}>Department Of Computer Science And Engineering</div>
        <div className={styles.title}>Bangladesh University Of Engineering And Technology</div>
        <div className={styles.title}>Student Id: 2105142</div>
        <div className={styles.title} onClick={navigateToProfile}>GitHub Link</div>
      </div>
    </div>
    </Fragment>
  );
};

export default footer;
