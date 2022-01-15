import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
   ADD_CONTACT,
   DELETE_CONTACT,
   SET_CURRENT,
   CLEAR_CURRENT,
   UPDATE_CONTACT,
   FILTER_CONTACTS,
   CLEAR_FILTER,
} from '../types';

//Create initial state
const ContactState = (props) => {
   const initialState = {
      contacts: [
         {
            id: 1,
            name: 'Captain America',
            email: 'captain@gmail.com',
            phone: '111-111-1111',
            type: 'personal',
         },
         {
            id: 2,
            name: 'Hawkeye',
            email: 'hawkeye@gmail.com',
            phone: '222-222-2222',
            type: 'professional',
         },
         {
            id: 3,
            name: 'Hulk',
            email: 'Hulk@gmail.com',
            phone: '333-333-3333',
            type: 'personal',
         },
         {
            id: 4,
            name: 'Iron Man',
            email: 'Iron@gmail.com',
            phone: '222-222-2222',
            type: 'professional',
         },
      ],
      //If a specific contact item is edited, it will be put inside the 'current' state.
      current: null,
   };
   //Next pull out the state and dispatch using 'useReducer' hook

   //state allow us to use the states, dispatch to dispatch state .
   const [state, dispatch] = useReducer(contactReducer, initialState);

   //Add Contact - using uuid
   const addContact = (contact) => {
      contact.id = uuidv4();
      dispatch({ type: ADD_CONTACT, payload: contact });
   };
   //Delete Contact
   const deleteContact = (id) => {
      dispatch({ type: DELETE_CONTACT, payload: id });
   };
   //Set Current Contact
   const setCurrent = (contact) => {
      dispatch({ type: SET_CURRENT, payload: contact });
   };
   //Clear Current Contact
   const clearCurrent = () => {
      dispatch({ type: CLEAR_CURRENT });
   };
   //Update Contact

   //Filter Contacts

   //Clear Filter

   return (
      <ContactContext.Provider
         //Have access to 'state' due to useReducer hook
         value={{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;
