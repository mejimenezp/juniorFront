import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useContext(AuthContext);

    return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;
