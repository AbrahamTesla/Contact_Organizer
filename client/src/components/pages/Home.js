import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
   //Load the user to the homepage '/' by using authContext.loaduser
   const authContext = useContext(AuthContext);

   // Call authContext under 'User Effect' put the user in the state. Run when user loads
   useEffect(() => {
      authContext.loadUser();
      //eslint-disable-next-line
   }, []);
   return (
      <div className='grid-2'>
         <div>
            <ContactForm />{' '}
         </div>
         <div>
            <ContactFilter />
            <Contacts />
         </div>
      </div>
   );
};

export default Home;
