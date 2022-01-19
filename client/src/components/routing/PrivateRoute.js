import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// Route since we're building private roue and redirect since we're redirecting to Login page
//taking prop of component and any other props (rest)
const PrivateRoute = ({ component: Component, ...rest }) => {
   const authContext = useContext(AuthContext);

   const { isAuthenticated, loading } = authContext;

   return (
      <Route
         {...rest}
         /* Route to login page if is not Authenticated and done loading*/
         render={props =>
            !isAuthenticated && !loading ? (
               <Redirect to='/login' />
            ) : (
               <Component {...props} />
            )
         }
      />
   );
};

export default PrivateRoute;
