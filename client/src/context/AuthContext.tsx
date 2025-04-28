import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from '../config/axios';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('/api/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setIsAuthenticated(true);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred during login';
            setError(errorMessage);
            setIsAuthenticated(false);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (email: string, password: string, name: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('/api/auth/register', { email, password, name });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setIsAuthenticated(true);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred during registration';
            setError(errorMessage);
            setIsAuthenticated(false);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                error,
                login,
                register,
                logout,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 