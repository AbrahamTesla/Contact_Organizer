const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const { check, validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const User = require('../models/User');
const { exists } = require('../models/Contact');

// @route   GET api/contacts
//@desc     Get all users contacts
//@access   Private (auth middleware)

router.get('/', auth, async (req, res) => {
   try {
      // Finding contacts using "find" method & Using "user" field inside the model to find anything. Sorted -1 to most recent
      const contacts = await Contact.find({ user: req.user.id }).sort({
         date: -1,
      });
      res.json(contacts);
   } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Errors');
   }
});
// @route   POST api/contacts
//@desc     Add new contacts
//@access   Private (auth middleware)
//Will need to use auth middleware and validation-checker
router.post(
   '/',
   [auth, [check('name', 'Name is Required').not().isEmpty()]],
   async (req, res) => {
      const errors = validationResult(req);
      //check to see if errors is empty
      if (!errors.isEmpty()) {
         //400 is Bad Request
         return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, phone, type } = req.body;
      try {
         const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id,
         });

         // const newContact = await new Contact({
         //    name,
         //    email,
         //    phone,
         //    type,
         //    user: req.user.id,
         // });

         const contact = await newContact.save();

         // newContact.save();

         res.json(contact);

         // res.json(newContact);
      } catch (error) {
         console.error(error.message);
         res.status(500).send('Server Error!');
      }
   }
);
// @route   PUT api/contacts
//@desc     Update all users contacts
//@access   Private (needs auth middleware)

router.put('/:id', auth, async (req, res) => {
   //Pull in all the fields for req.body by destructuring
   const { name, email, phone, type } = req.body;

   //Create an object called contactFields
   const contactFields = {};

   if (name) contactFields.name = name;
   if (email) contactFields.email = email;
   if (phone) contactFields.phone = phone;
   if (type) contactFields.type = type;

   try {
      //Creating a variable to match user by 'Id' using findById method
      let contact = await Contact.findById(req.params.id);

      //If contact does not exist send message Contat is not found, 404 not found
      if (!contact)
         return res.status(404).json({ message: 'Contact not found' });

      //Make sure that the user owns the contact and not anyone updating the contact fields. 'toString' method to convert ID to string. 401 unauthorized
      //contact.user had access because you instantitate let contact to Contact Model.
      if (contact.user.toString() !== req.user.id)
         return res.status(401).json({ message: 'Not authorized' });

      // Update fields (name, phone , email , type) using 'findByAndUpdate' method. passed object '$set' - to create the contactFields, & passed 'new' if this contact does not exists, create it.
      contact = await Contact.findByIdAndUpdate(
         req.params.id,
         { $set: contactFields },
         { new: true }
      );

      res.json(contact);
   } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
   }
});
// @route   Delete api/contacts
//@desc     Delete contact
//@access   Private (Needs auth middleware)

router.delete('/:id', auth, async (req, res) => {
   try {
      let contact = await Contact.findById(req.params.id);

      if (!contact)
         return res.status(404).json({ message: 'Contact not found' });

      if (contact.user.toString() !== req.user.id)
         return res.status(401).json({ message: 'Not authorized' });

      //No need to instantiate a variable, only removing contacts.  Used 'findByIdAndRemove' method.
      await Contact.findByIdAndRemove(req.params.id);

      res.json({ message: 'Contact Removed' });
   } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
   }
});
module.exports = router;
