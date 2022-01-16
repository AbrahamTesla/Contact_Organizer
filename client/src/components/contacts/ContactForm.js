import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

/*1. Create a form bringing the 'useState' hook for component level state
2. import ContactContext to have access to state
3. Create a function 'add contact' under 'ContactState'. Therefore, when adding to our state we need to import ContactContext
4. Dispatch it under 'ContactReducer' that uses switch statement
5.  Don't forget to add the value under 'ContactContext.provider'
6. Create onChange fx & onSubmit fx under contact form*/

const ContactForm = () => {
   //Initialize ContactContext.  This will be use for the fx 'addContact'
   const contactContext = useContext(ContactContext);

   //Destructuring from contactContext
   const { addContact, updateContact, current, clearCurrent } = contactContext;

   const [contact, setContact] = useState({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
   });

   //Using useEffect hook when form is filled like componentdidMount.  If current is NOT null, setContact to current.  Otherwise form to setContact Default
   useEffect(() => {
      if (current !== null) {
         setContact(current);
      } else {
         setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal',
         });
      }
      //Needs to call these dependencies
   }, [contactContext, current]);

   const { name, email, phone, type } = contact;

   //Create a function onChange to target the current state.  Use spread operator and target the attributes 'name' and value
   const onChange = (e) =>
      setContact({ ...contact, [e.target.name]: e.target.value });

   const clearAll = () => {
      clearCurrent();
   };

   const onSubmit = (e) => {
      e.preventDefault();

      //If current is empty therefore we want to add new contact. Else, if the form is filled , we want to change it to update the contact
      if (current === null) {
         //Add contact fx created under 'contactState.js' that passes our state 'contact'
         addContact(contact);
      } else {
         updateContact(contact);
      }

      //Clear our state and pass-in the default values of the state
      clearAll();
   };

   return (
      <form onSubmit={onSubmit}>
         <h2 className='text-primary'>
            {/* Changes the Header betwee 'Update Contact' vs 'Add Contact'*/}
            {current ? 'Update Contact' : 'Add Contact'}
         </h2>
         <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
         />
         <input
            type='text'
            placeholder='email'
            name='email'
            value={email}
            onChange={onChange}
         />
         <input
            type='text'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={onChange}
         />
         <h5>Contact Type</h5>
         {/* Input value with radial button that checked if type is either personal or professional */}
         <input
            type='radio'
            name='type'
            value='personal'
            checked={type === 'personal'}
            onChange={onChange}
         />
         Personal{' '}
         <input
            type='radio'
            name='type'
            value='professional'
            checked={type === 'professional'}
            onChange={onChange}
         />{' '}
         Professional
         <div>
            {/*Updating the label of the button 'Update Contact' vs 'Add Contact */}
            <input
               type='submit'
               value={current ? 'Update Contact' : 'Add Contact'}
               className='btn btn-primary btn-block'
            />
         </div>
         {/* if Current create the 'clear' button*/}
         {current && (
            <div>
               <button className='btn-ligth btn-block' onClick={clearAll}>
                  Clear
               </button>
            </div>
         )}
      </form>
   );
};

export default ContactForm;
