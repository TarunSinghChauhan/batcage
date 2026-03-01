import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Search, Clapperboard, PlusSquare, User } from 'lucide-react';

const Navigation = () => {
    const { currentUser, requireAuth } = useAuth();
    const location = useLocation();

    const navItems = [
        { label: 'Home', icon: Home, path: '/home', protected: false },
        { label: 'Explore', icon: Search, path: '/explore', protected: false },
        { label: 'Upload', icon: PlusSquare, path: '/upload', protected: true },
        { label: 'Reels', icon: Clapperboard, path: '/reels', protected: false },
        { label: 'Profile', icon: User, path: currentUser ? `/profile/${currentUser.uid}` : '/login', protected: false },
    ];

    return (
        <nav className="flex justify-around items-center h-16 px-4 bg-dark-bg/90 backdrop-blur-md shadow-lg shadow-black/50 border-t border-dark-border relative z-50">
            {navItems.map((item) => (
                <div key={item.label}>
                    {item.protected && !currentUser ? (
                        <button
                            onClick={() => requireAuth(() => { })}
                            className="p-3 text-gray-500 hover:text-white transition-colors group outline-none focus:outline-none"
                        >
                            <item.icon size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)] transition-all duration-300 transform group-active:scale-95" strokeWidth={1.5} />
                        </button>
                    ) : (
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `p-3 transition-colors group outline-none focus:outline-none flex flex-col items-center justify-center ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(136,8,8,0.5)]' : 'text-gray-500 hover:text-gray-300'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <item.icon
                                    size={24}
                                    className={`group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)] transition-all duration-300 transform group-active:scale-95 ${isActive ? 'drop-shadow-[0_0_8px_rgba(136,8,8,0.8)] scale-110' : ''
                                        }`}
                                    strokeWidth={isActive ? 2 : 1.5}
                                />
                            )}
                        </NavLink>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Navigation;
