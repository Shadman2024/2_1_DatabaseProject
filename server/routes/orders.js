const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming pool is your PostgreSQL client from pg module
const authorization = require('../middleware/authorization');

router.get('/', authorization, async (req, res) => {
    console.log("Got signal");
    try {
        // Assuming 'user_id' is obtained from the authorization middleware
        const userId = req.user;

        // Query to fetch orders and their details for the logged-in user
        const ordersQuery = `
        SELECT 
        o.order_id,
        o.total_price,
        o.created_at,
        o.status,
        json_agg(
            json_build_object(
                'name', i.name,
                'quantity', od.quantity,
                'price', od.price
            )
        ) AS items,
        si.address_line1, 
        si.city, 
        si.division, 
        si.zip_code, 
        si.shipping_date,
        p.payment_method,
        p.amount
    FROM orders o
    JOIN order_details od ON o.order_id = od.order_id
    JOIN items i ON od.item_id = i.item_id
    JOIN shipping_info si ON o.order_id = si.order_id
    JOIN payments p ON o.order_id = p.order_id
    WHERE o.user_id = $1 -- Use parameterized query to filter by user_id
    GROUP BY o.order_id, si.address_line1, si.city, si.division, si.zip_code, si.shipping_date, p.payment_method, p.amount
    
        `;
            console.log(userId);
        // Execute the query
        const { rows } = await pool.query(ordersQuery, [userId]);
        console.log("rows", rows);

        // Send the orders back to the client
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

module.exports = router;
