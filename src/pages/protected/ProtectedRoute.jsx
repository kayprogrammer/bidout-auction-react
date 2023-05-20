import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"

const ProtectedRoute = ({ Component, ...props }) => {
    const { user } = useSelector((state) => state.auth); // Check if the user is authenticated
    return (user?.access) ? <Component {...props}/> : <Navigate to="/login" />
};

export default ProtectedRoute;
