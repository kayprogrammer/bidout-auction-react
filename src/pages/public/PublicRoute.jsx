import React, { useEffect } from 'react';
import toast from '../toasts'
import { useNavigate } from 'react-router-dom';
import { store } from '../../app/store';

const PublicRoute = ({ Component, ...props }) => {
    const user = store.getState().auth.user
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
