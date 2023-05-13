import { configureStore } from '@reduxjs/toolkit'
import generalReducer from '../features/general/generalSlice';
import listingsReducer from '../features/listings/listingsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        general: generalReducer,
        listings: listingsReducer,
        auth: authReducer,
    }
})