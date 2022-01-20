const mongoose = require('mongoose');
require('dotenv').config();
// const db = config.get('mongoURI');

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.mongoURI, {
         useNewUrlParser: true,
      });
      console.log('MongoDB connected...');
   } catch (error) {
      console.log(err.message);
      process.exit(1);
   }
};

module.exports = connectDB;
