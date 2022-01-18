import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
   const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
   });

   //Initializing alertContext to bring the setAlert
   const alertContext = useContext(AlertContext);
   const authContext = useContext(AuthContext);

   const { setAlert } = alertContext;
   const { register, error, clearErrors, isAuthenticated } = authContext;

   //Using useEffect for error validation
   useEffect(() => {
      //We are going to set isAuthenticated to true and redirect to homepage '/'
      if (isAuthenticated) {
         props.history.push('/');
      }

      if (error === 'User already exist') {
         setAlert(error, 'danger');
         clearErrors();
      }
      //eslint-disable-next-line
   }, [error, isAuthenticated, props.history]);
   //Destructuring the properties from user
   const { name, email, password, password2 } = user;

   const onChange = e =>
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });

   const onSubmit = e => {
      e.preventDefault();

      //Validation. Alerts will fire if conditions are not met

      if (name === '' || email === '' || password === '') {
         setAlert('Please enter all fields', 'danger');
      } else if (password !== password2) {
         setAlert('Passwords does not match', 'danger');
      } else {
         //Register function that takes a parameter 'formData' therefore
         register({
            name,
            email,
            password,
         });
      }
   };

   return (
      <div className='form-containter'>
         <h1>
            Account <span className='text-primary'>Register</span>
         </h1>
         <form onSubmit={onSubmit}>
            <div className='form-group'>
               <label htmlFor='name'>Name</label>
               <input
                  type='text'
                  name='name'
                  onChange={onChange}
                  value={name}
               />
            </div>
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
                  minLength='6'
               />
            </div>
            <div className='form-group'>
               <label htmlFor='password2'>Confirm Password</label>
               <input
                  type='text'
                  name='password2'
                  onChange={onChange}
                  value={password2}
                  minLength='6'
               />
            </div>
            <input
               type='submit'
               value='Register'
               className='btn btn-primary btn-block'
            />
         </form>
      </div>
   );
};

export default Register;
