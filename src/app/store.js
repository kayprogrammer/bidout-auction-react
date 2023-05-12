import { configureStore } from '@reduxjs/toolkit'
import generalReducer from '../features/general/generalSlice';

export const store = configureStore({
    reducer: {
        general: generalReducer,
    }
})