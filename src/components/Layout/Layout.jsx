import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navigation from './Navigation';
import AuthModal from '../UI/AuthModal';

const Layout = () => {
    return (
        <div className="flex h-screen bg-dark-bg text-gray-200">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 border-r border-dark-border h-full sticky top-0">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full max-w-2xl mx-auto pb-16 md:pb-0 relative">
                <Outlet />
            </main>

            {/* Right Sidebar (Optional placeholder for larger screens) */}
            <div className="hidden lg:block lg:w-80 border-l border-dark-border h-full p-6 sticky top-0">
                <div className="bg-dark-surface rounded-lg p-4 mb-4">
                    <h3 className="text-gray-400 text-sm font-semibold mb-2">SUGGESTIONS FOR YOU</h3>
                    <div className="space-y-4 mt-4 text-xs">
                        <p className="items-center text-gray-500">Only shadows lurk here.</p>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-bg border-t border-dark-border z-40">
                <Navigation />
            </div>

            <AuthModal />
        </div>
    );
};

export default Layout;
