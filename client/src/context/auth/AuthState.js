import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthtoken from '../../utils/setAuthToken';
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
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
   const loadUser = async () => {
      //@todo - load token into global headers
      //Validation - if token exist is local storage then call the function setAuthToken passing the token in the localStorage
      if (localStorage.token) {
         setAuthtoken(localStorage.token);
      }

      try {
         const res = await axios.get('/api/auth');

         dispatch({ type: USER_LOADED, payload: res.data });
      } catch (error) {
         dispatch({ type: AUTH_ERROR });
      }
   };

   //Register User
   const register = async formData => {
      const config = {
         headers: {
            'content-type': 'application/json',
         },
      };
      try {
         //Using the proxy value we created from package.json
         const res = await axios.post('/api/users', formData, config);

         //Res or Response will be the 'token'
         dispatch({ type: REGISTER_SUCCESS, payload: res.data });

         //Call the function 'loadUser' under the register
         loadUser();
      } catch (error) {
         dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
      }
   };

   //Login User
   const login = async formData => {
      const config = {
         headers: {
            'content-type': 'application/json',
         },
      };
      try {
         //Using the proxy value we created from package.json
         const res = await axios.post('/api/auth', formData, config);

         //Res or Response will be the 'token'
         dispatch({ type: LOGIN_SUCCESS, payload: res.data });

         //Call the function 'loadUser' under the register
         loadUser();
      } catch (error) {
         dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
      }
   };

   //Logout
   const logout = () =>
      dispatch({
         type: LOGOUT,
      });

   //Clear Errors
   const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

   return (
      <AuthContext.Provider
         //Have access to 'state' due to useReducer hook
         value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            Loading: state.Loading,
            error: state.error,
            register,
            login,
            logout,
            clearErrors,
            loadUser,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
