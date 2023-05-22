import React, { useEffect } from 'react';
import { useSelector } from "react-redux"
import toast from '../toasts'
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ Component, ...props }) => {
    const { user } = useSelector((state) => state.auth); // Check if the user is authenticated
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.access) {
            toast.error("Logout first!")
            navigate(-1)
        }
    }, [user, navigate])

    return <Component {...props} />
};

export default PublicRoute;
