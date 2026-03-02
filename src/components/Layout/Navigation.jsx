import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Search, Clapperboard, PlusSquare, User, MessageCircle } from 'lucide-react';

const Navigation = () => {
    const { currentUser, requireAuth } = useAuth();
    const location = useLocation();

    const navItems = [
        { label: 'Home', icon: Home, path: '/home', protected: false },
        { label: 'Explore', icon: Search, path: '/explore', protected: false },
        { label: 'Upload', icon: PlusSquare, path: '/upload', protected: true },
        { label: 'Messages', icon: MessageCircle, path: '/messages', protected: true },
        { label: 'Reels', icon: Clapperboard, path: '/reels', protected: false },
        { label: 'Profile', icon: User, path: currentUser ? `/profile/${currentUser.uid}` : '/login', protected: false },
    ];

    return (
        <nav className="flex justify-around items-center h-16 px-2 bg-black/80 backdrop-blur-xl border-t border-bat-purple/20 relative z-50">
            {navItems.map((item) => (
                <div key={item.label} className="flex-1 flex justify-center">
                    {item.protected && !currentUser ? (
                        <button
                            onClick={() => requireAuth(() => { })}
                            className="p-2 text-gray-500 hover:text-white transition-all group outline-none focus:outline-none"
                        >
                            <item.icon size={22} className="group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)] transition-all duration-300 transform group-active:scale-90" strokeWidth={1.5} />
                        </button>
                    ) : (
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `p-2 transition-all group outline-none focus:outline-none flex flex-col items-center justify-center ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <div className="relative">
                                    <item.icon
                                        size={22}
                                        className={`transition-all duration-300 transform group-active:scale-90 ${isActive ? 'drop-shadow-[0_0_12px_rgba(136,8,8,1)] scale-110 text-white' : 'group-hover:text-white'
                                            }`}
                                        strokeWidth={isActive ? 2.5 : 1.5}
                                    />
                                    {isActive && (
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-bat-purple rounded-full neon-glow"></div>
                                    )}
                                </div>
                            )}
                        </NavLink>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Navigation;
