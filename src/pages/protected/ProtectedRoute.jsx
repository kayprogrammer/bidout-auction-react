import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useSelector((state) => state.user); // Check if the user is authenticated

    return (
        <Route
            {...rest}
            render={(props) =>
                user?.access ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" /> // Redirect to the login page if not authenticated
                )
            }
        />
    );
};

export default ProtectedRoute;
