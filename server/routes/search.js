const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/categories', async (req, res) => {
    console.log("achi re bhai achi");
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
router.get('/', async (req, res) => {
    // console.log("Request for search");
    
    
    const { query, categoryName, minPrice, maxPrice, sort } = req.query;
    // if (!query) {
    //     return res.status(400).json({ error: "Search query cannot be null." });
    // }
    
    console.log("cat ",categoryName);
    console.log("query ",query);
    console.log("sort ",sort);
    let sqlQuery = `
        SELECT i.item_id, i.name, i.price, i.image, c.name AS category_name,
               COALESCE(r.rating, 0) AS rating
        FROM items i
        JOIN categories c ON i.category_id = c.category_id
        LEFT JOIN (
            SELECT item_id,
                   SUM(upvotes) - SUM(downvotes) AS rating
            FROM reviews
            GROUP BY item_id
        ) r ON i.item_id = r.item_id
    `;

    const queryParams = [];

    let conditions = [];
    
    if (query) {
        queryParams.push(`%${query}%`);
        conditions.push(`i.name ILIKE $${queryParams.length}`);
    }

    if (categoryName) {
        queryParams.push(categoryName);
        conditions.push(`c.name = $${queryParams.length}`);
    }

    if (minPrice) {
        queryParams.push(minPrice);
        conditions.push(`i.price >= $${queryParams.length}`);
    }

    if (maxPrice) {
        queryParams.push(maxPrice);
        conditions.push(`i.price <= $${queryParams.length}`);
    }


    if (conditions.length) {
        sqlQuery += ` WHERE ${conditions.join(' AND ')}`;
    }


    if (sort) {
        const orderByMapping = {
            name: 'i.name',
            price: 'i.price',
            rating: 'rating' 
        };
        const orderBy = orderByMapping[sort];
        if (orderBy) {
            sqlQuery += ` ORDER BY ${orderBy}`;
        }
    }

    try {
        const { rows } = await pool.query(sqlQuery, queryParams);
        // console.log('rows,', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Server error');
    }
});

module.exports = router;