import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
   REGISTER_SUCCESS,
   REGISTERT_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   CLEAR_ERRORS,
} from '../types';

//Create initial state
const AuthState = props => {
   const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      user: null,
      Loading: true,
      error: null,
   };

   const [state, dispatch] = useReducer(authReducer, initialState);

   //Load User

   //Register User

   //Login User

   //Logout

   //Clear Errors

   return (
      <AuthContext.Provider
         //Have access to 'state' due to useReducer hook
         value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            Loading: state.Loading,
            error: state.error,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
