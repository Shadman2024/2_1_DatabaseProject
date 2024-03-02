const express = require('express');
const router = express.Router();
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo =require('../middleware/validinfoSignUp')
router.post('/',validinfo, async (req, res) => {
    try {
        const { first_name, middle_name, last_name, phone_number, email, password } = req.body;
        
        const Query = "INSERT INTO users(first_name, middle_name, last_name, phone_number, email, password_hash) \
        VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt('bf'))) RETURNING user_id";
        const newUser = await pool.query(Query, [first_name, middle_name, last_name, phone_number, email, password]);
        
        if (newUser.rows.length > 0) {
            const token = jwtGenerator(newUser.rows[0].user_id);
            res.json({token});
        } else {
            // Handle the case where no user was inserted, if applicable
            res.status(500).send('User could not be created');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
