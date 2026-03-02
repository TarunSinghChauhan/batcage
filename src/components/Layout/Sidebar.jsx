import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Search, Clapperboard, Heart, PlusSquare, MessageCircle, User } from 'lucide-react';
import BatLogo from '../UI/BatLogo';

const Sidebar = () => {
    const { currentUser, requireAuth } = useAuth();

    const navItems = [
        { label: 'Feed', icon: Home, path: '/home', protected: false },
        { label: 'Explore', icon: Search, path: '/explore', protected: false },
        { label: 'Reels', icon: Clapperboard, path: '/reels', protected: false },
        { label: 'Messages', icon: MessageCircle, path: '/messages', protected: true },
        { label: 'Alerts', icon: Heart, path: '/notifications', protected: false },
        { label: 'Upload', icon: PlusSquare, path: '/upload', protected: true },
        { label: 'Identify', icon: User, path: currentUser ? `/profile/${currentUser.uid}` : '/login', protected: false },
    ];

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl p-4 pt-8 border-r border-bat-purple/20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
            <div className="px-2 mb-12 flex items-center space-x-3 group cursor-pointer">
                <BatLogo size={36} className="group-hover:scale-110 transition-transform duration-500" />
                <h1 className="text-2xl font-black tracking-[0.2em] text-white uppercase font-serif group-hover:text-bat-purple transition-colors duration-500">
                    BAT<span className="text-bat-purple">CAVE</span>
                </h1>
            </div>

            <nav className="flex-1 space-y-3">
                {navItems.map((item) => (
                    <div key={item.label}>
                        {item.protected && !currentUser ? (
                            <button
                                onClick={() => requireAuth(() => { })}
                                className="w-full flex items-center space-x-4 px-4 py-3 text-gray-500 hover:text-white hover:bg-bat-purple/10 rounded-xl transition-all duration-300 group outline-none border border-transparent hover:border-bat-purple/30"
                            >
                                <item.icon size={22} className="group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)] transition-all duration-300" strokeWidth={1.5} />
                                <span className="font-bold tracking-[0.1em] text-[11px] uppercase">{item.label}</span>
                            </button>
                        ) : (
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group outline-none border ${isActive
                                        ? 'text-white bg-bat-purple/10 border-bat-purple/50 neon-glow'
                                        : 'text-gray-500 hover:text-white hover:bg-bat-purple/5 border-transparent hover:border-bat-purple/20'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <React.Fragment>
                                        <item.icon
                                            size={22}
                                            className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_10px_rgba(136,8,8,1)] text-white' : 'group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)]'}`}
                                            strokeWidth={isActive ? 2.5 : 1.5}
                                        />
                                        <span className={`tracking-[0.1em] text-[11px] uppercase ${isActive ? 'font-black text-neon' : 'font-bold'}`}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 bg-bat-purple rounded-full neon-glow animate-pulse"></div>
                                        )}
                                    </React.Fragment>
                                )}
                            </NavLink>
                        )}
                    </div>
                ))}
            </nav>

            {/* User Status */}
            <div className="mt-auto px-4 py-6 border-t border-bat-purple/20">
                {currentUser ? (
                    <div className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-10 h-10 bg-dark-bg rounded-xl flex items-center justify-center border border-bat-purple/30 group-hover:border-bat-purple transition-colors p-[1px]">
                            <div className="w-full h-full bg-bat-purple/10 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                {currentUser.displayName?.charAt(0) || 'U'}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{currentUser.displayName}</span>
                            <span className="text-[8px] text-gray-600 font-mono uppercase tracking-tighter">Authorized Personnel</span>
                        </div>
                    </div>
                ) : (
                    <NavLink to="/login" className="flex items-center justify-center w-full bg-bat-purple/10 border border-bat-purple/50 text-bat-purple hover:bg-bat-purple hover:text-white font-black tracking-[0.2em] transition-all py-3 rounded-xl text-[10px] uppercase neon-glow">
                        Access Terminal
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
