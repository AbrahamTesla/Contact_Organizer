import React, { useState, useContext } from 'react';
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

   const [contact, setContact] = useState({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
   });

   const { name, email, phone, type } = contact;

   //Create a function onChange to target the current state.  Use spread operator and target the attributes 'name' and value
   const onChange = (e) =>
      setContact({ ...contact, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();

      //Add contact fx created under 'contactState.js' that passes our state 'contact'
      contactContext.addContact(contact);

      //Clear our state and pass-in the default values of the state
      setContact({
         name: '',
         email: '',
         phone: '',
         type: 'personal',
      });
   };
   return (
      <form onSubmit={onSubmit}>
         <h2 className='text-primary'>Add Contact</h2>
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
            <input
               type='submit'
               value='Add Contact'
               className='btn btn-primary btn-block'
            />
         </div>
      </form>
   );
};

export default ContactForm;
