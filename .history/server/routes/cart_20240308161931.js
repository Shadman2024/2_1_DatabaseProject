const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req, res) => {
    try {
        console.log("Cart GET");
        const userId = req.user; // Adjust depending on how user ID is stored in req.user
        console.log(userId);
        // Assuming req.user contains the user ID of the authenticated user

        // Query to fetch cart items for the user, including item details and total price per item
        const userCartItems = await pool.query(
            `SELECT 
            c.item_id, 
            i.name, 
            i.description, 
            i.price, 
            c.quantity, 
            (i.price * c.quantity) AS total_price
            FROM cart c
            JOIN items i ON c.item_id = i.item_id
            WHERE c.user_id = $1`,
            [userId]
        );

        // Check if the user has items in the cart
        if (userCartItems.rows.length === 0) {
            return res.status(404).json({ message: "No items in cart." });
        }

        // Respond with the cart items
        console.log[userCartItems.rows];
        res.json(userCartItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});
// POST route to add an item to the cart
router.post('/', authorization, async (req, res) => {
    console.log("Cart POST");
    try {
        const userId = req.user; // Assuming req.user contains the user ID
        const { item_id, quantity } = req.body; // Extract item_id and quantity from the request body

        // Insert the item into the cart, or update quantity if the item already exists
        const newItem = await pool.query(
            `INSERT INTO cart (user_id, item_id, quantity)
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id, item_id) 
                DO UPDATE SET quantity = cart.quantity + $3
                RETURNING *`,
            [userId, item_id, quantity]
        );

        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});
// PATCH route to update the quantity of an item in the cart
router.patch('/:itemId', authorization, async (req, res) => {
    console.log("Cart PATCH");
    try {
        const userId = req.user;
        const { itemId } = req.params; // Extract the item ID from the URL
        const { quantity } = req.body; // Extract the new quantity from the request body

        // Update the quantity of the specified item for the user
        const updateItem = await pool.query(
            `UPDATE cart SET quantity = $1
            WHERE user_id = $2 AND item_id = $3
            RETURNING *`,
            [quantity, userId, itemId]
        );

        if (updateItem.rows.length === 0) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        res.json(updateItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});
// DELETE route to remove an item from the cart
router.delete('/:itemId', authorization, async (req, res) => {
    console.log("Cart DELETTE");
    try {
        const userId = req.user;
        const { itemId } = req.params; // Extract the item ID from the URL
        // console.log(req);
        console.log(userId);
        console.log(itemId);

        // Delete the specified item for the user
        const deleteItem = await pool.query(
            `DELETE FROM cart
                WHERE user_id = $1 AND item_id = $2
                RETURNING *`,
            [userId, itemId]
        );

        if (deleteItem.rows.length === 0) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        res.json({ message: "Item removed from cart." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

router.post('/cart/complete-order', async (req, res) => {
    const { user_id, total_price, cartItems, shippingInfo, paymentInfo, cardInfo } = req.body;
    console.log(req.body);
    try {
        await pool.query('BEGIN'); // Start transaction to ensure atomicity

        // Create the order
        const orderResult = await pool.query(
            'INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING order_id',
            [user_id, total_price, 'placed']
        );
        const orderId = orderResult.rows[0].order_id;

        // Insert order details for each cart item
        for (const item of cartItems) {
            await pool.query(
                'INSERT INTO order_details (order_id, item_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.item_id, item.quantity, item.price]
            );
        }

        // Add shipping information
        await pool.query(
            'INSERT INTO shipping_info (order_id, address_line1, address_line2, city, division, zip_code, shipping_date) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [orderId, shippingInfo.addressLine1, shippingInfo.addressLine2, shippingInfo.city, shippingInfo.division, shippingInfo.zipCode, shippingInfo.shippingDate]
        );

        // Process payment
        await pool.query(
            'INSERT INTO payments (order_id, user_id, amount, payment_method) VALUES ($1, $2, $3, $4)',
            [orderId, user_id, paymentInfo.amount, paymentInfo.paymentMethod]
        );

        // Handle card information if payment method is Credit Card
        if (paymentInfo.paymentMethod === 'Credit Card') {
            await pool.query(
                'INSERT INTO card_info (user_id, card_number, card_holder_name, expiry_month, expiry_year, cvv) VALUES ($1, $2, $3, $4, $5, $6)',
                [user_id, cardInfo.cardNumber, cardInfo.cardHolderName, cardInfo.expiryMonth, cardInfo.expiryYear, cardInfo.cvv]
            );
        }

        await pool.query('COMMIT'); // Commit the transaction

        res.json({ message: 'Order completed successfully', orderId });
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback the transaction in case of error
        console.error('Error processing order:', error);
        res.status(500).send('Server error during order processing');
    }
});




module.exports = router;
