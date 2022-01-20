const jwt = require('jsonwebtoken');
const config = require('config');
// require('dotenv').config();

//Middleware function for protective route (private)
module.exports = function (req, res, next) {
   // First Get the toke from the header

   const token = req.header('x-auth-token');

   //Check if token exist

   if (!token) {
      // Return 401 unauthorized
      return res.status(401).json({ message: 'Invalid Authorization' });
   }

   try {
      //verifying token , replacing this code config.get('jwtSecret')
      const decoded = jwt.verify(token, config.get('jwtSecret'));

      //Set the user within that payload to req.user to have access inside the route
      req.user = decoded.user;
      next();
   } catch (error) {
      console.error(error.message);
      res.status(401).json({ message: 'Token is not valid' });
   }
};
