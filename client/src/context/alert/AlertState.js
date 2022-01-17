import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

//Create initial state
const AlertState = props => {
   //Array of Objects
   const initialState = [];

   const [state, dispatch] = useReducer(alertReducer, initialState);

   //SET ALERT but alert disappears after certain amount of time in this case 5 seconds
   const setAlert = (msg, type, timeout = 5000) => {
      const id = uuidv4();

      dispatch({ type: SET_ALERT, payload: { msg, type, id } });
      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
   };

   return (
      <AlertContext.Provider
         //Have access to 'state' due to useReducer hook
         value={{
            alerts: state,
            setAlert,
         }}
      >
         {props.children}
      </AlertContext.Provider>
   );
};

export default AlertState;
