import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
   // initialize the context.  To have access to contactContext.
   const contactContext = useContext(ContactContext);

   //Destructuring.  To pull out contacts & filtered out of contactContext
   const { contacts, filtered } = contactContext;

   //If there's no added contacts, please add one
   if (contacts.length === 0) {
      return <h4>Please Add Contacts</h4>;
   }

   return (
      <Fragment>
         {/*If our filterd is not null , go through (map) on our filtered state (contact) and return ContactItem.  
      Else, go through each of our contacts */}
         <TransitionGroup>
            {filtered !== null
               ? filtered.map(contact => (
                    <CSSTransition
                       key={contact.id}
                       timeout={500}
                       classNames='item'
                    >
                       <ContactItem contact={contact} />
                    </CSSTransition>
                 ))
               : contacts.map(contact => (
                    <CSSTransition
                       key={contact.id}
                       timeout={500}
                       classNames='item'
                    >
                       <ContactItem contact={contact} />
                    </CSSTransition>
                 ))}
         </TransitionGroup>
      </Fragment>
   );
};

export default Contacts;
