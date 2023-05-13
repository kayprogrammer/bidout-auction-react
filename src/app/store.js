import { configureStore } from '@reduxjs/toolkit'
import generalReducer from '../features/general/generalSlice';
import listingsReducer from '../features/listings/listingsSlice';

export const store = configureStore({
    reducer: {
        general: generalReducer,
        listings: listingsReducer,
    }
})