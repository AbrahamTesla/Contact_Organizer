import React, { useState } from 'react';

const Login = () => {
   const [user, setUser] = useState({
      email: '',
      password: '',
   });

   //Destructuring the properties from user
   const { email, password } = user;

   const onChange = e =>
      setUser({
         ...user,
         [e.targe.name]: e.target.value,
      });

   const onSubmit = e => {
      e.preventDefault();

      console.log('Login User');
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
