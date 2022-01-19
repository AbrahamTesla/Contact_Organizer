import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
   //Initialize 'ContactContext' to add functions of deleteContact
   const contactContext = useContext(ContactContext);

   // pulling out the deleteContact action from contactcontext
   const { deleteContact, setCurrent, clearCurrent } = contactContext;

   //Destructuring to take the properties we want out of the 'contact' prop
   const { _id, name, phone, email, type } = contact;

   const onDelete = () => {
      deleteContact(_id);
      clearCurrent();
   };

   return (
      <div className='card bg-light'>
         <h3 className='text-primary text-left'>
            {/* With name and badge depending on the type : professiona or personal.  Capitalized the 'P' using javascript , charAt & slice method */}
            {name}{' '}
            <span
               style={{ float: 'right' }}
               className={
                  'badge ' +
                  (type === 'professional' ? 'badge-success' : 'badge-primary')
               }
            >
               {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
         </h3>
         <ul className='list'>
            {/* If email 7 phone exist create this icons & list */}
            {email && (
               <li>
                  <i className='fas fa-envelope-open'></i>
                  {email}
               </li>
            )}
            {phone && (
               <li>
                  <i className='fas fa-phone'></i>
                  {phone}
               </li>
            )}
         </ul>
         <p>
            <button
               className='btn btn-dark btn-sm'
               onClick={() => setCurrent(contact)}
            >
               Edit
            </button>
            <button className='btn btn-danger btn-sm' onClick={onDelete}>
               Delete
            </button>
         </p>
      </div>
   );
};

ContactItem.prototypes = {
   contact: PropTypes.object.isRequired,
};
export default ContactItem;
