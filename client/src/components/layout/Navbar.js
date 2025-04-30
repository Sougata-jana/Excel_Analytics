import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    const authLinks = (
        <div className="flex items-center">
            {user && (
                <span className="mr-4 text-white">
                    Welcome, {user.name}
                </span>
            )}
            <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
            >
                Logout
            </button>
        </div>
    );

    const guestLinks = (
        <div className="flex items-center space-x-4">
            <Link
                to="/register"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
            >
                Register
            </Link>
            <Link
                to="/login"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
            >
                Login
            </Link>
        </div>
    );

    return (
        <nav className="bg-blue-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-white font-bold text-xl"
                        >
                            Excel Analytics Platform
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 