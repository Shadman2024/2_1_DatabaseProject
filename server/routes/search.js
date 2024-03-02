const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    console.log("Request for search");

    const { query, categoryName, subcategoryName, minPrice, maxPrice, sort } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Search query cannot be null." });
    }

    let sqlQuery = `
    SELECT DISTINCT ON (i.item_id) i.item_id, i.name, i.price, i.image, c.name AS category_name,
        COALESCE(r.rating, 0) AS rating
    FROM items i
    JOIN categories c ON i.category_id = c.category_id
    JOIN subcategories sc ON i.subcategory_id = sc.subcategory_id
    LEFT JOIN (
        SELECT item_id, SUM(upvotes) - SUM(downvotes) AS rating
        FROM reviews
        GROUP BY item_id
        ) r ON i.item_id = r.item_id
    `;

    const queryParams = [];

    let conditions = [];

    // Adjusting the condition to search by item name, category name, or subcategory name
    if (query) {
        queryParams.push(`%${query}%`);
        queryParams.push(`%${query}%`);
        queryParams.push(`%${query}%`);
        conditions.push(`(i.name ILIKE $${queryParams.length - 2} OR c.name ILIKE $${queryParams.length - 1} OR sc.name ILIKE $${queryParams.length})`);
    }

    if (categoryName) {
        queryParams.push(categoryName);
        conditions.push(`c.name = $${queryParams.length}`);
    }

    if (subcategoryName) {
        queryParams.push(subcategoryName);
        conditions.push(`sc.name = $${queryParams.length}`);
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
            rating: 'rating',
            categoryName: 'c.name',
            subcategoryName: 'sc.name'
        };
        const orderBy = orderByMapping[sort];
        if (orderBy) {
            sqlQuery += ` ORDER BY ${orderBy}`;
        }
    }

    try {
        const { rows } = await pool.query(sqlQuery, queryParams);
        console.log('rows,', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Server error');
    }
});

module.exports = router;
