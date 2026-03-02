import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navigation from './Navigation';
import AuthModal from '../UI/AuthModal';
import BatLogo from '../UI/BatLogo';

const Layout = () => {
    return (
        <div className="flex h-screen bg-black text-gray-200 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 border-r border-bat-purple/10 h-full sticky top-0 z-50">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Mobile Top Bar */}
                <header className="md:hidden flex items-center justify-between px-6 h-16 bg-black/60 backdrop-blur-xl border-b border-bat-purple/10 sticky top-0 z-40">
                    <Link to="/home" className="flex items-center space-x-2">
                        <BatLogo size={28} />
                        <h1 className="text-lg font-black tracking-[0.2em] text-white uppercase font-serif">
                            BAT<span className="text-bat-purple">CAVE</span>
                        </h1>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {/* Placeholder for future mobile actions */}
                        <div className="w-2 h-2 bg-bat-purple rounded-full animate-pulse shadow-[0_0_8px_rgba(136,8,8,1)]"></div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto w-full relative custom-scrollbar">
                    <div className="max-w-xl mx-auto md:py-8 min-h-full">
                        <Outlet />
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-bat-purple/10 z-50">
                    <Navigation />
                </div>
            </div>

            {/* Right Sidebar (Optional for desktop) */}
            <div className="hidden lg:block lg:w-80 border-l border-bat-purple/10 h-full p-8 sticky top-0 bg-black/20">
                <div className="bg-bat-purple/5 border border-bat-purple/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-bat-purple text-[10px] font-black tracking-[0.3em] mb-6 uppercase">Intelligence Feed</h3>
                    <div className="space-y-6">
                        <div className="flex flex-col space-y-1">
                            <p className="text-[10px] text-gray-500 font-mono tracking-tighter">[02:14] No abnormal activity detected.</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sector 7 Clear</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className="text-[10px] text-gray-500 font-mono tracking-tighter">[04:00] Surveillance drones active.</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Perimeter Secure</p>
                        </div>
                    </div>
                </div>

                <footer className="mt-8 px-2 text-[8px] text-gray-700 font-mono uppercase tracking-[0.4em] leading-loose">
                    &copy; 2026 Wayne Enterprises Intelligence System. Version 4.0.2-B
                </footer>
            </div>

            <AuthModal />
        </div>
    );
};

export default Layout;
