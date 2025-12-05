import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Función redux para Autenticar usuarios
export const store = configureStore({
reducer: {
    authenticator: authReducer,
},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
