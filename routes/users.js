const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const { check, validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const { genSalt } = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
// require('dotenv').config();
// @route   POST api/user
//@desc     Register a user
//@access   Public

router.post(
   '/',
   [
      check('name', 'Please type your username').not().isEmpty(),
      check('email', 'Please provide your email').isEmail(),
      check(
         'password',
         'Please provide password with 6 or more characters'
      ).isLength({
         min: 6,
      }),
   ],
   async (req, res) => {
      //For validation purposes
      const errors = validationResult(req);
      //check to see if errors is empty
      if (!errors.isEmpty()) {
         //400 is Bad Request
         return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      try {
         let user = await User.findOne({ email });

         if (user) {
            return res.status(400).json({ msg: 'User already exist' });
         }
         //Creating the user using the userSchema Model
         user = new User({
            name,
            email,
            password,
         });
         //Encrypting the password using bcryptjs
         const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password, salt);

         await user.save();

         //Creating the payload for jwt token by extracting the user ID.
         const payload = {
            user: {
               id: user.id,
            },
         };
         //Returning the token
         jwt.sign(
            payload,
            //'jwtSecret
            config.get('jwtSecret'),
            {
               expiresIn: 360000,
            },
            (err, token) => {
               if (err) throw err;
               res.json({ token });
            }
         );
      } catch (error) {
         console.error(error.message);
         res.status(500).send('Server Error');
      }
   }
);

module.exports = router;
