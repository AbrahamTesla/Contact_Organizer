import {
   ADD_CONTACT,
   DELETE_CONTACT,
   SET_CURRENT,
   CLEAR_CURRENT,
   UPDATE_CONTACT,
   FILTER_CONTACTS,
   CLEAR_FILTER,
} from '../types';

export default (state, action) => {
   switch (action.type) {
      case ADD_CONTACT:
         return {
            ...state,
            contacts: [...state.contacts, action.payload],
         };
      case UPDATE_CONTACT:
         return {
            ...state,
            // update the contacts array, if the contact ID match the action.payload ID then return the updated contact (action.payload) else return the current contact
            contacts: state.contacts.map((contact) =>
               contact.id === action.payload.id ? action.payload : contact
            ),
         };
      case DELETE_CONTACT:
         //Filter fx that filters out the current contact id that was pass-in the payload(id) from contactState.js
         return {
            ...state,
            contacts: state.contacts.filter(
               (contact) => contact.id !== action.payload
            ),
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
            filtered: state.contacts.filter((contact) => {
               const regex = new RegExp(`${action.payload}`, 'gi');
               return contact.name.match(regex) || contact.email.match(regex);
            }),
         };
      case CLEAR_FILTER:
         return {
            ...state,
            filtered: null,
         };
      default:
         return state;
   }
};
