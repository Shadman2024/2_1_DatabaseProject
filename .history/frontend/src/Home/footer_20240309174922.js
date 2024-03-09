import React, { Fragment, useState, useEffect } from "react";
import styles from './footer.module.css';


const footer = () => {
  

  return (
    <Fragment>
       <div className={styles.container}>
  <div className={styles.man}>
    <div className={styles.title}>MD MEHEDI HASAN MIM</div>
    <div className={styles.title}>Department Of Computer Science And Engineering</div>
    <div className={styles.title}>Bangladesh University Of Engineering And Technology</div>
    <div className={styles.title}>Student Id: 2105142</div>
    <div className={styles.title}>
      <a href="https://github.com/yourGitHubUsername" target="_blank" rel="noopener noreferrer">
        GitHub Link
      </a>
    </div>
  </div>
</div>
    </Fragment>
  );
};

export default footer;
