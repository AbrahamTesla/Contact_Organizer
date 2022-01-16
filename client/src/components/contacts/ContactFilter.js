import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

/* Using 'useRef' to referrence an actual DOM objects.  Alternative for form.*/

const ContactFilter = () => {
   //Intiliaze useContext
   const contactContext = useContext(ContactContext);

   //Initialize useRef
   const text = useRef('');

   //Destructuring ContactContext
   const { filterContacts, clearFilter, filtered } = contactContext;

   /*Will use the 'useEffect' hook if the filtered text is equal to null.
Want the form to be */
   useEffect(() => {
      if (filtered === null) text.current.value = '';
   }, [filtered, text]);

   /*If the current text value within the filter form is not empty, use the filterContacts method created from contactState.js.
by passing the value entered by the user. Else, make the form clear*/
   const onChange = (e) => {
      if (text.current.value !== '') {
         filterContacts(e.target.value);
      } else {
         clearFilter();
      }
   };

   return (
      <form>
         <input
            ref={text}
            type='text'
            placeholder='Filter Contacts...'
            onChange={onChange}
         />
      </form>
   );
};

export default ContactFilter;
