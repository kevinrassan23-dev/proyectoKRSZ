import { createSlice } from '@reduxjs/toolkit';

// Parámetros de autenticación
export interface AuthState {
isAuthenticated: boolean;
userName: string;
userRol: string;
}

// Estado global del usuario por defecto
const initialAuthState: AuthState = {
isAuthenticated: false,
userName: '',
userRol: ''
};

// Metodo para hacer acciones en base al estado global del usuario
const authSlice = createSlice({
name: 'authentication',
// Llamamos al estado global para saber como se encuentra
initialState: initialAuthState,

// Acciones si el login se cumple o no
reducers: {
    login: (state, action) => {
    state.isAuthenticated = true;
    state.userName = action.payload.name;
    state.userRol = action.payload.rol;
    },
    logout: (state) => {
    state.isAuthenticated = false;
    state.userName = '';
    state.userRol = '';
    }
}
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
