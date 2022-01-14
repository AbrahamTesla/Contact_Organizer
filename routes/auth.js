const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
// const { check, validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator');

//@route   GET api/auth
//@desc    GET logged in user
//@access  Private

router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
   }
});

//@route   POST api/auth
//@desc    Auth & get token
//@access  Public

router.post(
   '/',
   [
      check('email', 'Please Include emai').isEmail(),
      check('password', 'Please Provide valid credentials').exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      //Destructuring email and password
      const { email, password } = req.body;

      try {
         let user = await User.findOne({ email });

         if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
         }

         //Comparing password by using bcrypt compare method
         const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
         }

         //Returning the token
         const payload = {
            user: {
               id: user.id,
            },
         };

         jwt.sign(
            payload,
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
         console.log(error.message);
         res.status(500).json('Server Error');
      }
   }
);

module.exports = router;
