import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create axios instance with base URL and default headers
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: false,
    error: null
};

// Register User
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/register', {
                name,
                email,
                password
            });
            
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
            }
            
            return res.data;
        } catch (err) {
            console.error('Registration error:', err.response?.data || err.message);
            return rejectWithValue(
                err.response?.data?.msg || 'Registration failed. Please try again.'
            );
        }
    }
);

// Login User
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/login', {
                email,
                password
            });
            
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
            }
            
            return res.data;
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            return rejectWithValue(
                err.response?.data?.msg || 'Login failed. Please check your credentials.'
            );
        }
    }
);

// Load User
export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            
            if (!token) {
                throw new Error('No token found');
            }

            const config = {
                headers: {
                    'x-auth-token': token
                }
            };

            const res = await api.get('/users/me', config);
            return res.data;
        } catch (err) {
            console.error('Load user error:', err.response?.data || err.message);
            return rejectWithValue(
                err.response?.data?.msg || 'Failed to load user data.'
            );
        }
    }
);

// Add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register cases
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload;
            })
            // Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload;
            })
            // Load user cases
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 