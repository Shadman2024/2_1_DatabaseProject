import React, { Fragment, useState, useEffect } from 'react';
import styles from './dashboard.module.css'
import dp from '../dashboard/dp.png'
import {firebaseApp,storage} from '../firebase'
import {ref , uploadBytesResumable  , getDownloadURL} from 'firebase/storage';
const checkout = ({ setAuth }) => {

    return (
        <Fragment>

        </Fragment>
    );
};

export default checkout; 
