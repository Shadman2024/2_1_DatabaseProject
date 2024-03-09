const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.get('/items', authorization, async (req, res) => {
    console.log("Fetching items for user");
    try {
        const userId = req.user;
        console.log("UserID ", userId);
        
       
        const query = `
            SELECT 
                items.item_id,
                items.name,
                items.description,
                items.price,
                items.status,
                items.date_posted,
                categories.name AS category_name,
                subcategories.name AS subcategory_name,
                images.image_url AS image_url
            FROM 
                items
                INNER JOIN categories ON items.category_id = categories.category_id
                INNER JOIN subcategories ON (items.subcategory_id = subcategories.subcategory_id and items.category_id = subcategories.category_id ) 
                LEFT JOIN images ON items.item_id = images.item_id
            WHERE 
                items.user_id = $1
            GROUP BY 
                items.item_id, categories.name, subcategories.name, images.image_url
            ORDER BY 
                items.date_posted DESC;
        `;
        
        const items = await pool.query(query, [userId]);
        res.json(items.rows);
    } catch (error) {
        console.error("Error fetching items with details: ", error);
        res.status(500).send('Server error');
    }
});


router.delete('/items/:itemId',authorization, async (req, res) => {
    console.log("Ki bhai delete");
    try {
        const { itemId } = req.params;
        console.log("itemID ",itemId);
        await pool.query('DELETE FROM items WHERE item_id = $1', [itemId]);
        res.send('Item deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.put('/items/:itemId', authorization, async (req, res) => {
    console.log("Ki bhai update");
    try {
        const { itemId } = req.params;
        const { name, description, price, status } = req.body;
        await pool.query(
            'UPDATE items SET name = $1, description = $2, price = $3, status = $4 WHERE item_id = $5',
            [name, description, price, status, itemId]
        );
        res.send('Item updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.get('/orders', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT o.order_id, o.total_price, o.created_at, o.status, array_agg(od.item_id) as item_ids, array_agg(od.quantity) as quantities
            FROM orders o
            JOIN order_details od ON o.order_id = od.order_id
            GROUP BY o.order_id
            ORDER BY o.created_at DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
