const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/',authorization, async (req, res) => {
    try {
        const discount = await pool.query(`SELECT unnest(enum_range(NULL::discount_type)) AS discount_type`);
        console.log('discount', discount.rows);
        res.json(discount.rows);
        console.log('discount', discount.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
});





module.exports = router;