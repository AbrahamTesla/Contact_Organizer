import {
   ADD_CONTACT,
   GET_CONTACTS,
   DELETE_CONTACT,
   SET_CURRENT,
   CLEAR_CURRENT,
   UPDATE_CONTACT,
   FILTER_CONTACTS,
   CLEAR_FILTER,
   CONTACT_ERROR,
   CLEAR_CONTACTS,
} from '../types';

export default (state, action) => {
   switch (action.type) {
      case GET_CONTACTS:
         return {
            ...state,
            contacts: action.payload,
            // loading: false,
         };
      case ADD_CONTACT:
         return {
            ...state,
            //For contacts : action.payload is first so that the most recent addition will go at the top on front end. It's like sorting the most recent addition on top first
            contacts: [action.payload, ...state.contacts],
            // loading: false,
         };
      case UPDATE_CONTACT:
         return {
            ...state,
            // update the contacts array, if the contact ID match the action.payload ID then return the updated contact (action.payload) else return the current contact
            contacts: state.contacts.map(contact =>
               contact._id === action.payload._id ? action.payload : contact
            ),
            // loading: false,
         };
      case DELETE_CONTACT:
         //Filter fx that filters out the current contact id that was pass-in the payload(id) from contactState.js
         return {
            ...state,
            contacts: state.contacts.filter(
               contact => contact._id !== action.payload
            ),
            // loading: false,
         };
      case CLEAR_CONTACTS:
         return {
            ...state,
            contacts: null,
            filtered: null,
            error: null,
            current: null,
         };
      case SET_CURRENT:
         return {
            ...state,
            current: action.payload,
         };
      case CLEAR_CURRENT:
         return {
            ...state,
            current: null,
         };
      /* We want to match whatever the user typing on the filter form.  By using 'Regex expression' with 'gi' global case insensitive
      upper case or lower case.  Will match the name and email from our available contacts thru user inputs. Using 'match' method we can passed
      the parameter we use to instantiate RegExp*/
      case FILTER_CONTACTS:
         return {
            ...state,
            filtered: state.contacts.filter(contact => {
               const regex = new RegExp(`${action.payload}`, 'gi');
               return contact.name.match(regex) || contact.email.match(regex);
            }),
         };
      case CLEAR_FILTER:
         return {
            ...state,
            filtered: null,
         };
      case CONTACT_ERROR:
         return {
            ...state,
            error: action.payload,
         };
      default:
         return state;
   }
};
