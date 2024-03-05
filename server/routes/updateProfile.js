const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');


router.post('/', authorization, async (req, res) => {
    try {
      const  {first_name , middle_name,last_name,optionalPhone , photo_url } = req.body;
      console.log(optionalPhone);
      const  user  = req.user; // assuming the user's id is stored in req.user by the authorize middleware
      const updateQuery = 'UPDATE users SET first_name = $1, middle_name = $2, last_name = $3 WHERE user_id = $4 RETURNING *';
      const updatedUser= await pool.query(updateQuery, [first_name, middle_name, last_name, user]);
      const insertPhoneNumberQuery = `INSERT INTO userphonenumber (user_id, phone_number) 
        VALUES ($1, $2)  ON CONFLICT (user_id) 
        DO UPDATE SET phone_number = EXCLUDED.phone_number RETURNING *`;
        await pool.query(insertPhoneNumberQuery, [user, optionalPhone]);
        const insertPhotoUrlQuery = `INSERT INTO userphoto (user_id, photo_url)`;
        await pool.query(insertPhotoUrlQuery, [user, photo_url]);
      //  console.log('updatedUser',updatedUser);
       if(updatedUser.rowCount>0)  res.json(true);
      //window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error');
    }
  });
  
  module.exports = router;