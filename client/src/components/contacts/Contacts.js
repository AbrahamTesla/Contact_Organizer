import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
   // initialize the context.  To have access to contactContext.
   const contactContext = useContext(ContactContext);

   //Destructuring.  To pull out contacts out of contactContext
   const { contacts } = contactContext;
   return (
      <Fragment>
         {contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
         ))}
      </Fragment>
   );
};

export default Contacts;
