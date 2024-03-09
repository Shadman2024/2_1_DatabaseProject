import React, { Fragment, useState, useEffect } from 'react';
import styles from './checkout.module.css'
import { useLocation } from 'react-router-dom';

const checkout = ({ setAuth }) => {
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };
    
    return (
        <Fragment>

        </Fragment>
    );
};

export default checkout; 
