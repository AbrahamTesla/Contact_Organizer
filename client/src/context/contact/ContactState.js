import React, { useReducer } from 'react';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
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
   CONTACT_ERROR,
   GET_CONTACTS,
   CLEAR_CONTACTS,
} from '../types';

//Create initial state
const ContactState = props => {
   const initialState = {
      contacts: null,
      // {
      //    id: 1,
      //    name: 'Captain America',
      //    email: 'captain@gmail.com',
      //    phone: '111-111-1111',
      //    type: 'personal',
      // },
      // {
      //    id: 2,
      //    name: 'Hawkeye',
      //    email: 'hawkeye@gmail.com',
      //    phone: '222-222-2222',
      //    type: 'professional',
      // },
      // {
      //    id: 3,
      //    name: 'Hulk',
      //    email: 'Hulk@gmail.com',
      //    phone: '333-333-3333',
      //    type: 'personal',
      // },
      // {
      //    id: 4,
      //    name: 'Iron Man',
      //    email: 'Iron@gmail.com',
      //    phone: '222-222-2222',
      //    type: 'professional',
      // },

      //If a specific contact item is edited, it will be put inside the 'current' state.
      current: null,

      //Filtered state for doing a search which defaults to null
      filtered: null,

      //Error state which used for sending message of response error
      error: null,
      // loading: true,
   };
   //Next pull out the state and dispatch using 'useReducer' hook

   //state allow us to use the states, dispatch to dispatch state .
   const [state, dispatch] = useReducer(contactReducer, initialState);

   //Get Contact
   const getContacts = async () => {
      //No need for config since we're not sending any body

      //SetAuthtoken is set globally, thus no need to send token here which is store in localStorage
      try {
         const res = await axios.get('/api/contacts');

         //Payload - sending the response coming from the server.  Thus, res.data
         dispatch({ type: GET_CONTACTS, payload: res.data });
      } catch (error) {
         dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      }
   };

   //Add Contact - using uuid
   //Making a request therefore 'async'
   const addContact = async contact => {
      // contact.id = uuidv4() used during the front-end set up only;
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      //SetAuthtoken is set globally, thus no need to send token here which is store in localStorage
      try {
         const res = await axios.post('/api/contacts', contact, config);

         //Payload - sending the response coming from the server.  Thus, res.data
         dispatch({ type: ADD_CONTACT, payload: res.data });
      } catch (error) {
         dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      }
   };

   //Update Contact
   const updateContact = async contact => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      try {
         const res = await axios.put(
            `/api/contacts/${contact._id}`,
            contact,
            config
         );

         dispatch({
            type: UPDATE_CONTACT,
            payload: res.data,
         });
      } catch (error) {
         dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
      }
      dispatch({ type: UPDATE_CONTACT, payload: contact });
   };

   //Delete Contact
   const deleteContact = async id => {
      try {
         await axios.delete(`/api/contacts/${id}`);
         dispatch({ type: DELETE_CONTACT, payload: id });
      } catch (error) {
         dispatch({
            type: CONTACT_ERROR,
            payload: error.response.msg,
         });
      }
   };
   //Set Current Contact
   const setCurrent = contact => {
      dispatch({ type: SET_CURRENT, payload: contact });
   };
   //Clear Current Contact
   const clearCurrent = () => {
      dispatch({ type: CLEAR_CURRENT });
   };

   //Filter Contacts which takes a parameter of text
   const filterContacts = text => {
      dispatch({ type: FILTER_CONTACTS, payload: text });
   };

   //Clear Contacts
   const clearContacts = contact => {
      dispatch({ type: CLEAR_CONTACTS });
   };

   //Clear Filter
   const clearFilter = () => {
      dispatch({ type: CLEAR_FILTER });
   };
   return (
      <ContactContext.Provider
         //Have access to 'state' due to useReducer hook
         value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts,
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;
