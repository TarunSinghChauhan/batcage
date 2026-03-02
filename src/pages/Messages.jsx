import React, { useState } from 'react';
import { Search as SearchIcon, Edit, Image, Video, Mic, PlusCircle, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BatLogo from '../components/UI/BatLogo';
import { motion, AnimatePresence } from 'framer-motion';

const mockChats = [
    { id: 1, name: 'Alfred', message: 'The car is ready, sir.', time: '2m', unread: true },
    { id: 2, name: 'Gordon', message: 'We have a signal. Rooftop ASAP.', time: '15m', unread: true },
    { id: 3, name: 'Selina', message: 'See you around, bats.', time: '4h', unread: false },
    { id: 4, name: 'Lucius', message: 'Specs for the new suit are attached.', time: '1d', unread: false }
];

const Messages = () => {
    const { currentUser } = useAuth();
    const [selectedChat, setSelectedChat] = useState(null);

    if (!currentUser) return null;

    return (
        <div className="flex h-[calc(100vh-4rem)] md:h-screen bg-black/20 backdrop-blur-xl page-transition">
            {/* Sidebar / Chat List */}
            <div className={`w-full md:w-[350px] flex-shrink-0 border-r border-bat-purple/20 bg-black/40 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="px-6 py-8 border-b border-bat-purple/10 flex justify-between items-center bg-black/60 sticky top-0 z-10">
                    <div className="flex items-center space-x-3">
                        <BatLogo size={24} />
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] font-serif">{currentUser.displayName || 'Bruce Wayne'}</h2>
                    </div>
                    <button className="text-gray-500 hover:text-bat-purple transition-colors p-2 hover:bg-bat-purple/10 rounded-lg">
                        <Edit size={18} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 py-4 border-b border-bat-purple/10 sticky top-[73px] bg-black/20 z-10">
                    <div className="relative group">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-bat-purple transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="SCANNING FREQUENCIES..."
                            className="w-full bg-black/60 border border-bat-purple/20 rounded-xl pl-10 pr-4 py-2 text-[10px] text-white focus:outline-none focus:border-bat-purple/50 transition-all font-mono tracking-widest uppercase placeholder-gray-700"
                        />
                    </div>
                </div>

                {/* Chats */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <h3 className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.4em] text-bat-purple border-b border-bat-purple/5">Encrypted Channels</h3>

                    <div className="space-y-1 px-2 py-2">
                        {mockChats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-500 border ${selectedChat?.id === chat.id ? 'bg-bat-purple/10 border-bat-purple/40 shadow-[0_0_15px_rgba(157,0,255,0.15)]' : 'hover:bg-bat-purple/5 border-transparent hover:border-bat-purple/10'}`}
                            >
                                <div className="w-12 h-12 rounded-2xl border border-bat-purple/20 overflow-hidden relative shrink-0 p-[1px]">
                                    {chat.unread && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-bat-purple rounded-full border border-black animate-pulse shadow-[0_0_10px_rgba(157,0,255,1)] z-10"></div>}
                                    <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=000&color=9d00ff&size=50`} alt={chat.name} className="w-full h-full object-cover rounded-[14px]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[11px] truncate font-black tracking-widest uppercase ${chat.unread ? 'text-white' : 'text-gray-400'}`}>{chat.name}</p>
                                    <p className={`text-[10px] truncate ${chat.unread ? 'text-gray-200 font-bold' : 'text-gray-600 font-mono'}`}>{chat.message}</p>
                                </div>
                                <div className="text-[8px] text-gray-700 uppercase font-bold tracking-tighter shrink-0">{chat.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex flex-col bg-black/20 relative ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <AnimatePresence mode="wait">
                    {selectedChat ? (
                        <motion.div
                            key={selectedChat.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col"
                        >
                            {/* Chat Header */}
                            <div className="h-[80px] px-6 border-b border-bat-purple/20 flex items-center justify-between bg-black/60 backdrop-blur-xl sticky top-0 z-20">
                                <div className="flex items-center space-x-4">
                                    <button className="md:hidden text-white hover:text-bat-purple transition-colors" onClick={() => setSelectedChat(null)}>
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-bat-purple/30 group-hover:border-bat-purple transition-colors p-[1px]">
                                            <img src={`https://ui-avatars.com/api/?name=${selectedChat.name}&background=000&color=9d00ff&size=50`} alt={selectedChat.name} className="w-full h-full rounded-lg" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-white text-xs tracking-[0.2em] uppercase">{selectedChat.name}</span>
                                            <span className="text-[9px] text-bat-purple font-mono uppercase tracking-widest animate-pulse">Link Stable</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat History */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
                                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none md:ml-[175px]">
                                    <BatLogo size={400} />
                                </div>

                                <div className="text-center text-[9px] text-gray-500 uppercase font-mono tracking-[0.4em] my-8 relative z-10 px-6 py-2 border border-bat-purple/20 rounded-full w-fit mx-auto bg-black/40 shadow-[0_0_15px_rgba(157,0,255,0.1)] animate-pulse">
                                    [ END-TO-END ENCRYPTION ACTIVE | SIGNAL SECURE ]
                                </div>

                                {/* Incoming */}
                                <div className="flex space-x-3 max-w-[85%] relative z-10 items-end">
                                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-bat-purple/20 shrink-0">
                                        <img src={`https://ui-avatars.com/api/?name=${selectedChat.name}&background=000&color=9d00ff&size=30`} />
                                    </div>
                                    <div className="bg-black/40 border border-bat-purple/20 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-none text-xs shadow-xl font-mono leading-relaxed">
                                        {selectedChat.message}
                                    </div>
                                </div>

                                {/* Outgoing */}
                                <div className="flex space-x-3 max-w-[85%] ml-auto relative z-10 items-end justify-end">
                                    <div className="bg-bat-purple/20 border border-bat-purple/40 text-white px-4 py-3 rounded-2xl rounded-br-none text-xs shadow-[0_0_25px_rgba(157,0,255,0.1)] font-mono leading-relaxed">
                                        ACQUISITION CONFIRMED. PROCEEDING TO SECTOR 7.
                                    </div>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="p-6 bg-black/40 border-t border-bat-purple/10 sticky bottom-0 z-20">
                                <div className="border border-bat-purple/20 bg-black/60 rounded-2xl flex items-center px-4 py-2 shadow-2xl focus-within:border-bat-purple/50 transition-all duration-500 group">
                                    <button className="p-2 text-gray-600 hover:text-bat-purple transition-colors">
                                        <PlusCircle size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="INPUT TRANSMISSION..."
                                        className="flex-1 bg-transparent text-xs text-white focus:outline-none px-4 py-3 font-mono tracking-widest uppercase placeholder-gray-800"
                                    />
                                    <div className="flex space-x-2 text-gray-600">
                                        <button className="p-2 hover:text-bat-purple transition-all transform hover:scale-110">
                                            <Mic size={18} />
                                        </button>
                                        <button className="p-2 hover:text-bat-purple transition-all transform hover:scale-110">
                                            <Image size={18} />
                                        </button>
                                        <button className="p-2 bg-bat-purple text-white rounded-xl shadow-lg shadow-bat-purple/20 hover:scale-105 active:scale-95 transition-all">
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[radial-gradient(circle_at_center,rgba(157,0,255,0.08)_0%,transparent_70%)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="mb-10 relative"
                            >
                                <div className="absolute inset-0 blur-[40px] bg-bat-purple/20 rounded-full"></div>
                                <BatLogo size={120} className="relative z-10" />
                            </motion.div>
                            <h3 className="text-xl font-black text-white uppercase tracking-[0.6em] mb-4">Tactical Comms</h3>
                            <p className="text-gray-600 text-[10px] max-w-xs font-mono leading-relaxed tracking-widest uppercase opacity-80 mb-8">
                                Direct encrypted link to Gotham high-level operatives. Authorization required for decryption.
                            </p>
                            <button className="bg-bat-purple/20 border border-bat-purple/50 text-white font-black py-4 px-12 rounded-xl shadow-[0_0_40px_rgba(157,0,255,0.3)] hover:bg-bat-purple hover:shadow-bat-purple/60 transition-all uppercase tracking-[0.3em] text-[10px] relative group overflow-hidden">
                                <span className="relative z-10">Initiate New Uplink</span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Messages;
