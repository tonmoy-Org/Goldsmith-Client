import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";




const PrivateRoute = ({children}) => {
    const {user, loading } = useContext(AuthContext);
    const location = useLocation(); 

    if(loading){
        return <p className="w-16 mx-auto"><span className="loading loading-spinner text-primary w-16"></span></p>
    }
    if(user?.email){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;