const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
   //Create a relationship between contacts and User
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   },
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
   },
   phone: {
      type: String,
   },
   type: {
      type: String,
      default: 'personal',
   },
   date: {
      type: String,
      default: Date.now,
   },
});

module.exports = mongoose.model('contact', ContactSchema);
