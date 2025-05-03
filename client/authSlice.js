import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials, {
            withCredentials: true // Include credentials in the request
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, {
            withCredentials: true // Include credentials in the request
        });
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

export default authSlice.reducer;