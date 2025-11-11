import React, { use} from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
   const {loading}= use(AuthContext)
    



    if(loading){
        return <div className="flex items-center justify-center h-screen">
  <span className="loading loading-dots loading-xl"></span>
</div>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;