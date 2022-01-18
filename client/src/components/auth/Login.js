import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
   const [user, setUser] = useState({
      email: '',
      password: '',
   });

   //Initializing alertContext to bring the setAlert & Login
   const alertContext = useContext(AlertContext);
   const authContext = useContext(AuthContext);

   const { setAlert } = alertContext;
   const { login, error, isAuthenticated, clearErrors } = authContext;

   //Destructuring the properties from user
   const { email, password } = user;

   useEffect(() => {
      if (isAuthenticated) {
         props.history.push('/');
      }
      if (error === 'Invalid credentials') {
         setAlert(error, 'danger');
         clearErrors();
      }
      //eslin-disable-next-line
   }, [error, isAuthenticated, props.history]);

   const onChange = e =>
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });

   const onSubmit = e => {
      e.preventDefault();

      //Validation if email and password is not blank
      if (email === '' || password === '') {
         setAlert('Please provide valid credentials', 'danger');
      } else {
         console.log('Login User');
         login({
            email,
            password,
         });
      }
   };

   return (
      <div className='form-containter'>
         <h1>
            Account <span className='text-primary'>Login</span>
         </h1>
         <form onSubmit={onSubmit}>
            <div className='form-group'>
               <label htmlFor='email'>Email Address</label>
               <input
                  type='text'
                  name='email'
                  onChange={onChange}
                  value={email}
               />
            </div>
            <div className='form-group'>
               <label htmlFor='password'>Password</label>
               <input
                  type='text'
                  name='password'
                  onChange={onChange}
                  value={password}
               />
            </div>
            <input
               type='submit'
               value='Login'
               className='btn btn-primary btn-block'
            />
         </form>
      </div>
   );
};

export default Login;
