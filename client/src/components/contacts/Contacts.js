import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';

const Contacts = () => {
   // initialize the context.  To have access to contactContext.
   const contactContext = useContext(ContactContext);

   //Destructuring.  To pull out contacts & filtered out of contactContext
   const { contacts, filtered, getContacts, clearContacts, loading } =
      contactContext;

   //This is use to get rid of the warning created by CSSTransition
   const nodeRef = React.useRef(null);

   //Call getContacts when the component loads, thus, 'useEffect'
   useEffect(() => {
      getContacts();
      // clearContacts();
      //eslint-disable-next-line
   }, []);
   //If there's no added contacts, please add one. Need state contacts is not null first or else will throw an error
   if (contacts !== null && contacts.length === 0 && !loading) {
      return <h4>Please Add Contacts</h4>;
   }

   return (
      <Fragment>
         {/*If our filterd is not null , go through (map) on our filtered state (contact) and return ContactItem.  
      Else, go through each of our contacts */}
         {contacts !== null && !loading ? (
            <TransitionGroup>
               {filtered !== null
                  ? filtered.map(contact => (
                       <CSSTransition
                          //Need to be contact._id same as our mongoDb '_id'
                          key={contact._id}
                          timeout={500}
                          classNames='item'
                          nodeRef={nodeRef}
                       >
                          <ContactItem contact={contact} />
                       </CSSTransition>
                    ))
                  : contacts.map(contact => (
                       <CSSTransition
                          key={contact._id}
                          timeout={500}
                          classNames='item'
                          nodeRef={nodeRef}
                       >
                          <ContactItem contact={contact} />
                       </CSSTransition>
                    ))}
            </TransitionGroup>
         ) : (
            <Spinner />
         )}
      </Fragment>
   );
};

export default Contacts;
