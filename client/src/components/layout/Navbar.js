import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
   const authContext = useContext(AuthContext);

   //Initiate to pull clearContacts
   const contactContext = useContext(ContactContext);

   const { logout, isAuthenticated, user } = authContext;

   const { clearContacts } = contactContext;

   //clearContacts method is needed so that when we logout, the contacts in the state is cleared using ReactDeveloper tool.
   const onLogout = () => {
      logout();
      clearContacts();
   };

   const authLinks = (
      <Fragment>
         <li>Hello {user && user.name} </li>
         <li>
            <a onClick={onLogout} href='#!'>
               <i className='fas fa-sign-out-alt'></i>{' '}
               <span className='hide-sm'>Logout</span>
            </a>
         </li>
      </Fragment>
   );
   const guessLinks = (
      <Fragment>
         <li>
            <Link to='/register'>Register</Link>
         </li>
         <li>
            <Link to='/login'>Login</Link>
         </li>
      </Fragment>
   );

   return (
      <div className='navbar bg-primary'>
         <h1>
            <i className={icon} />
            {title}
         </h1>
         <ul>{isAuthenticated ? authLinks : guessLinks}</ul>
      </div>
   );
};

Navbar.propTypes = {
   title: PropTypes.string.isRequired,
   icon: PropTypes.string,
};

Navbar.defaultProps = {
   title: 'Contact Organizer',
   icon: 'fas fa-id-card-alt',
};

export default Navbar;
