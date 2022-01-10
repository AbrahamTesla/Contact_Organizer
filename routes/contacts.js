const express = require('express');
const router = express.Router();

// @route   GET api/contacts
//@desc     Get all users contacts
//@access   Private

router.get('/', (req, res) => {
   res.send('get all contacts');
});
// @route   POST api/contacts
//@desc     Add new contacts
//@access   Private

router.post('/', (req, res) => {
   res.send('Add new contacts');
});
// @route   PUT api/contacts
//@desc     Update all users contacts
//@access   Private

router.put('/:id', (req, res) => {
   res.send('Update contacts');
});
// @route   Delete api/contacts
//@desc     Delete contact
//@access   Private

router.delete('/:id', (req, res) => {
   res.send('Delete contact');
});
module.exports = router;
