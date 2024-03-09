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
        // console.log('rows,',rows);
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
    WITH OrderedItems AS (
        SELECT 
            order_details.item_id, 
            SUM(order_details.quantity) AS order_count
        FROM order_details
        JOIN orders ON order_details.order_id = orders.order_id
        WHERE orders.created_at::date BETWEEN $1 AND $2
        GROUP BY order_details.item_id
        HAVING SUM(order_details.quantity) > 0
    ),
    ItemRatings AS (
        SELECT 
            item_id, 
            COALESCE(AVG(star_rating), 0) AS avg_star_rating
        FROM reviews
        GROUP BY item_id
    )
    SELECT 
        items.item_id, 
        items.name, 
        items.image,
        COALESCE(OrderedItems.order_count, 0) AS order_count,
        COALESCE(ItemRatings.avg_star_rating, 0) AS avg_star_rating
    FROM items
    LEFT JOIN OrderedItems ON items.item_id = OrderedItems.item_id
    LEFT JOIN ItemRatings ON items.item_id = ItemRatings.item_id
    WHERE OrderedItems.order_count > 0
    ORDER BY order_count DESC, avg_star_rating DESC;
    
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
router.get('/home/topsellers/:timeFrame', async (req, res) => {
    console.log("___");
    const timeFrame = req.params.timeFrame;
    let now = new Date();
let startDate, endDate;

if (timeFrame.toLowerCase() === 'today') {
    startDate = endDate = now.toISOString().slice(0, 10); // Today's date for both start and end
} else if (timeFrame.toLowerCase() === 'thisweek') {
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Adjust based on week start day
    const lastDayOfWeek = new Date(now.setDate(firstDayOfWeek.getDate() + 6)); // End of the week

    startDate = firstDayOfWeek.toISOString().slice(0, 10);
    endDate = lastDayOfWeek.toISOString().slice(0, 10);
} else {
    return res.status(400).send('Invalid timeframe');
}


    let sqlQuery = `
    WITH sales AS (
        SELECT 
            it.user_id, -- Get the user_id from items table as the seller
            CONCAT(u.first_name, ' ', COALESCE(u.middle_name || ' ', ''), u.last_name) AS full_name, 
            SUM(od.quantity) AS total_items_sold
        FROM 
            orders o
        JOIN order_details od ON o.order_id = od.order_id
        JOIN items it ON od.item_id = it.item_id -- Join with items to get the seller
        JOIN users u ON it.user_id = u.user_id -- Join with users to get the seller's details
        WHERE 
            o.created_at::date >= $1 AND o.created_at::date <= $2
        GROUP BY 
            it.user_id, CONCAT(u.first_name, ' ', COALESCE(u.middle_name || ' ', ''), u.last_name)
    )
    SELECT 
        user_id, 
        full_name, 
        total_items_sold
    FROM 
        sales
    ORDER BY 
        total_items_sold DESC;
    `;

    try {
        const { rows } = await pool.query(sqlQuery, [startDate, endDate]);
        console.log('Top Sellers:', rows);
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
