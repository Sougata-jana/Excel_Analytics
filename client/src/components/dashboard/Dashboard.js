import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Dashboard
                    </h1>
                    <p className="text-gray-700 mb-4">
                        Welcome {user?.name}! This is your Excel Analytics Dashboard.
                    </p>
                    <p className="text-sm text-gray-500">
                        In the next phase, we'll add file upload capabilities and data visualization features.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 