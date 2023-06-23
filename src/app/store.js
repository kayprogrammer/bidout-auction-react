import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import generalReducer from '../features/general/generalSlice';
import listingsReducer from '../features/listings/listingsSlice';
import authReducer from '../features/auth/authSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', "guestUser"]
}
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        general: generalReducer,
        listings: listingsReducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV === 'development'
})

// Create the persistor
export const persistor = persistStore(store);