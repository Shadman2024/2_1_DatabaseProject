const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.get('/',authorization, async (req, res) => {
  console.log("got");
    try {
        // res.json(req.user);
        const user = await pool.query(
          `SELECT  u.first_name, u.middle_name, u.last_name, u.email, 
          u.phone_number AS phone_number, upn.phone_number AS phone_number2
          FROM users u
          LEFT JOIN user_phone_number upn ON u.user_id = upn.user_id
          WHERE u.user_id = $1
          LIMIT 1;`,
            [req.user] 
            ); 
          console.log('user ',user.rows[0]);
          res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
});

module.exports = router;
