const express = require('express');
const router = express.Router();
const pool = require('../db'); //


router.get('/home/trending', async (req, res) => {
    try {
        const sqlQuery = `
        SELECT item_id, name, price,image
        FROM items
        `;
        // Execute the query
        const { rows } = await pool.query(sqlQuery);
        
        // Send back the query results
        console.log('rows,',rows);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Server error');
    }
});
router.get('/home/top/:timeFrame', async (req, res) => {
    const timeFrame = req.params.timeFrame;
    let startDate, endDate = new Date().toISOString().slice(0, 10); // Defaults to today for endDate
    const now = new Date();

    if (timeFrame.toLowerCase() === 'today') {
        startDate = now.toISOString().slice(0, 10); // Today's date
    } else if (timeFrame.toLowerCase() === 'thisweek') {
        // Calculate the start of the week, considering Sunday as the start
        startDate = new Date(now.setDate(now.getDate() - now.getDay())).toISOString().slice(0, 10);
    } else {
        return res.status(400).send('Invalid timeframe');
    }

    let sqlQuery = `
    SELECT items.item_id, items.name, items.image, 
           SUM(order_details.quantity) AS total_ordered_quantity
    FROM order_details
    JOIN orders ON order_details.order_id = orders.order_id
    JOIN items ON order_details.item_id = items.item_id
    WHERE orders.created_at::date BETWEEN $1 AND $2
    GROUP BY items.item_id
    ORDER BY total_ordered_quantity DESC
    `;

    const queryParams = [startDate, endDate];

    try {
        const { rows } = await pool.query(sqlQuery, queryParams);
        console.log('Filtered Items:', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Server error');
    }
});

router.get('/home/all_category', async (req, res) => {
    try {
        const sqlQuery = `
            SELECT category_id, name
            FROM categories
            ORDER BY name;
        `;
        // Execute the query
        const { rows } = await pool.query(sqlQuery);

        // Send back the query results
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Server error');
    }
});

module.exports = router;
