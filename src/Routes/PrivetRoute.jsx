import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Loading/Loading';

const PrivetRoute = ({children}) => {
      const {user,loading} = use(AuthContext)
      const location = useLocation(); 

       if(loading){
          return <Loading></Loading>
       }

        if(!user){
          return  <Navigate state={location.pathname}  to="/login"></Navigate>
        }

    return children;
};

export default PrivetRoute;