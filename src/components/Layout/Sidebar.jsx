import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Search, Clapperboard, Heart, PlusSquare, MessageCircle, User } from 'lucide-react';

const Sidebar = () => {
    const { currentUser, requireAuth } = useAuth();

    const navItems = [
        { label: 'Home', icon: Home, path: '/home', protected: false },
        { label: 'Explore', icon: Search, path: '/explore', protected: false },
        { label: 'Reels', icon: Clapperboard, path: '/reels', protected: false },
        { label: 'Messages', icon: MessageCircle, path: '/messages', protected: true },
        { label: 'Notifications', icon: Heart, path: '/notifications', protected: false },
        { label: 'Create', icon: PlusSquare, path: '/upload', protected: true },
        { label: 'Profile', icon: User, path: currentUser ? `/profile/${currentUser.uid}` : '/login', protected: false },
    ];

    return (
        <div className="flex flex-col h-full bg-dark-bg p-4 pt-8 border-r border-dark-border shadow-gray-900/50 shadow-xl">
            <div className="px-2 mb-10 flex items-center space-x-3">
                <img src="/bat.svg" alt="Bat Logo" className="w-8 h-8 opacity-90 drop-shadow-[0_0_8px_rgba(136,8,8,0.8)]" />
                <h1 className="text-xl font-bold tracking-widest text-white uppercase font-serif drop-shadow-[0_0_5px_rgba(136,8,8,0.5)]">
                    Bat Cave
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <div key={item.label}>
                        {item.protected && !currentUser ? (
                            <button
                                onClick={() => requireAuth(() => { })}
                                className="w-full flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-surface rounded-lg transition-all duration-300 group outline-none"
                            >
                                <item.icon size={24} className="group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)] transition-all duration-300" strokeWidth={1.5} />
                                <span className="font-medium tracking-wide text-sm">{item.label}</span>
                            </button>
                        ) : (
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 group outline-none ${isActive
                                        ? 'text-white bg-dark-surface/50 border-l-2 border-blood drop-shadow-[0_0_2px_rgba(136,8,8,0.5)]'
                                        : 'text-gray-400 hover:text-white hover:bg-dark-surface'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <React.Fragment>
                                        <item.icon
                                            size={24}
                                            className={`group-hover:-translate-y-0.5 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(136,8,8,0.8)]' : 'group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)]'}`}
                                            strokeWidth={isActive ? 2 : 1.5}
                                        />
                                        <span className={`font-medium tracking-wide text-sm ${isActive ? 'font-bold' : ''}`}>
                                            {item.label}
                                        </span>
                                    </React.Fragment>
                                )}
                            </NavLink>
                        )}
                    </div>
                ))}
            </nav>

            {/* User Status */}
            <div className="mt-auto px-4 py-3 border-t border-dark-border">
                {currentUser ? (
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <div className="w-8 h-8 bg-dark-surface rounded-full flex items-center justify-center border border-blood/50">
                            <span className="text-white text-xs">{currentUser.displayName?.charAt(0) || 'U'}</span>
                        </div>
                        <span className="text-sm font-medium text-white">{currentUser.displayName}</span>
                    </div>
                ) : (
                    <NavLink to="/login" className="text-blood font-semibold tracking-wide hover:text-red-600 transition-colors text-sm">
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
