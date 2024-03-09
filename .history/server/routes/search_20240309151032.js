// const express = require('express');
// const router = express.Router();
// const pool = require('../db');


// router.get('/categories', async (req, res) => {
//     console.log("achi re bhai achi");
//     try {
//         const sqlQuery = `
//             SELECT category_id, name
//             FROM categories
//             ORDER BY name;
//         `;
//         const { rows } = await pool.query(sqlQuery);

//         res.json(rows);
//     } catch (err) {
//         console.error('Error executing query', err.stack);
//         res.status(500).send('Server error');
//     }
// });
// router.get('/', async (req, res) => {
    
    
//     const { query, categoryName, minPrice, maxPrice, sort,user } = req.query;
    
//     console.log("cat ",categoryName);
//     console.log("query ",query);
//     console.log("sort ",sort);
//     console.log("user ",user);

//     let sqlQuery = `
//         SELECT i.item_id, i.name, i.price, i.image, c.name AS category_name,
//                COALESCE(r.rating, 0) AS rating
//         FROM items i
//         JOIN categories c ON i.category_id = c.category_id
//         LEFT JOIN (
//             SELECT item_id,
//                    SUM(upvotes) - SUM(downvotes) AS rating
//             FROM reviews
//             GROUP BY item_id
//         ) r ON i.item_id = r.item_id
//     `;

//     const queryParams = [];

//     let conditions = [];
    
//     if (query) {
//         queryParams.push(`%${query}%`);
//         conditions.push(`i.name ILIKE $${queryParams.length}`);
//     }

//     if (categoryName) {
//         queryParams.push(categoryName);
//         conditions.push(`c.name = $${queryParams.length}`);
//     }

//     if (minPrice) {
//         queryParams.push(minPrice);
//         conditions.push(`i.price >= $${queryParams.length}`);
//     }

//     if (maxPrice) {
//         queryParams.push(maxPrice);
//         conditions.push(`i.price <= $${queryParams.length}`);
//     }


//     if (conditions.length) {
//         sqlQuery += ` WHERE ${conditions.join(' AND ')}`;
//     }


//     if (sort) {
//         const orderByMapping = {
//             name: 'i.name',
//             price: 'i.price',
//             rating: 'rating' 
//         };
//         const orderBy = orderByMapping[sort];
//         if (orderBy) {
//             sqlQuery += ` ORDER BY ${orderBy}`;
//         }
//     }

//     try {
//         const { rows } = await pool.query(sqlQuery, queryParams);
//         const logSearchQuery = `
//             INSERT INTO search_history (user_id, search_query, category_name, sort_option)
//             VALUES ($1, $2, $3, $4);
//         `;
//         await pool.query(logSearchQuery, [user, query || null, categoryName ||null , sort||null]);


//         res.json(rows);
//     } catch (err) {
//         console.error('Error executing query or logging search', err.stack);
//         res.status(500).send('Server error');
//     }
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/categories', async (req, res) => {
    try {
        const sqlQuery = `
            SELECT category_id, name
            FROM categories
            ORDER BY name;
        `;
        const { rows } = await pool.query(sqlQuery);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    const { query, categoryName, minPrice, maxPrice, sort, user, star_rating } = req.query;

    let sqlQuery = `
        SELECT i.item_id, i.name, i.price, i.image, c.name AS category_name,
               COALESCE(avg_rating, 0) AS rating
        FROM items i
        JOIN categories c ON i.category_id = c.category_id
        LEFT JOIN (
            SELECT item_id, AVG(star_rating) AS avg_rating
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

    if (star_rating) {
        queryParams.push(star_rating);
        conditions.push(`COALESCE(avg_rating, 0) >= $${queryParams.length}`);
    }

    if (conditions.length) {
        sqlQuery += ` WHERE ${conditions.join(' AND ')}`;
    }

    if (sort) {
        const orderByMapping = {
            name: 'i.name',
            price: 'i.price',
            rating: 'avg_rating'
        };
        const orderBy = orderByMapping[sort];
        if (orderBy) {
            sqlQuery += ` ORDER BY ${orderBy}`;
        }
    }

    try {
        const { rows } = await pool.query(sqlQuery, queryParams);
        const logSearchQuery = `
            INSERT INTO search_history (user_id, search_query, category_name, sort_option)
            VALUES ($1, $2, $3, $4);
        `;
        await pool.query(logSearchQuery, [user, query || null, categoryName || null, sort || null]);

        res.json(rows);
    } catch (err) {
        console.error('Error executing query or logging search', err.stack);
        res.status(500).send('Server error');
    }
});

module.exports = router;


