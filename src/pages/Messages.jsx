import React, { useState } from 'react';
import { Search as SearchIcon, Edit, Image, Video, Mic, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mockChats = [
    { id: 1, name: 'Alfred', message: 'The car is ready, sir.', time: '2m', unread: true },
    { id: 2, name: 'Gordon', message: 'We have a signal. Rooftop ASAP.', time: '15m', unread: true },
    { id: 3, name: 'Selina', message: 'See you around, bats.', time: '4h', unread: false },
    { id: 4, name: 'Lucius', message: 'Specs for the new suit are attached.', time: '1d', unread: false }
];

const Messages = () => {
    const { currentUser } = useAuth();
    const [selectedChat, setSelectedChat] = useState(null);

    if (!currentUser) return null; // Protected route handles redirect, but just in case

    return (
        <div className="flex h-[calc(100vh-4rem)] md:h-screen bg-black">
            {/* Sidebar / Chat List */}
            <div className={`w-full md:w-[350px] flex-shrink-0 border-r border-dark-border bg-dark-bg flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="px-4 py-6 border-b border-dark-border flex justify-between items-center bg-dark-bg sticky top-0 z-10">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-bold text-white font-serif tracking-widest">{currentUser.displayName || 'Bruce Wayne'}</h2>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Edit size={22} className="hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 py-3 border-b border-dark-border/50 sticky top-[73px] bg-dark-bg z-10">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search transmissions..."
                            className="w-full bg-dark-surface border border-dark-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blood/50 transition-colors shadow-inner"
                        />
                    </div>
                </div>

                {/* Chats */}
                <div className="flex-1 overflow-y-auto">
                    <h3 className="px-4 py-2 my-2 text-xs font-bold uppercase tracking-wider text-gray-500">Encrypted Channels</h3>

                    <div className="space-y-1 px-2 pb-4">
                        {mockChats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedChat?.id === chat.id ? 'bg-dark-surface/80 border-l-2 border-blood shadow-md' : 'hover:bg-dark-surface border-l-2 border-transparent'}`}
                            >
                                <div className="w-12 h-12 rounded-full border border-gray-700 overflow-hidden relative shadow-[0_0_10px_rgba(0,0,0,0.8)] shrink-0">
                                    {chat.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-blood rounded-full border-2 border-black animate-pulse shadow-[0_0_5px_rgba(136,8,8,1)]"></div>}
                                    <img src={`https://ui-avatars.com/api/?name=${chat.name}&background=000&color=fff&size=50`} alt={chat.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm truncate font-medium ${chat.unread ? 'text-white font-bold tracking-wide' : 'text-gray-300'}`}>{chat.name}</p>
                                    <p className={`text-xs truncate ${chat.unread ? 'text-gray-200' : 'text-gray-500 font-mono'}`}>{chat.message}</p>
                                </div>
                                <div className="text-[10px] text-gray-600 uppercase font-semibold shrink-0">{chat.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex flex-col bg-dark-bg relative ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-[73px] px-6 border-b border-dark-border flex items-center justify-between bg-dark-surface/90 backdrop-blur-sm sticky top-0 z-20">
                            <div className="flex items-center space-x-4">
                                <button className="md:hidden text-white hover:text-blood" onClick={() => setSelectedChat(null)}>
                                    &larr;
                                </button>
                                <div className="flex items-center space-x-3 cursor-pointer">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-blood/50">
                                        <img src={`https://ui-avatars.com/api/?name=${selectedChat.name}&background=000&color=fff&size=50`} alt={selectedChat.name} />
                                    </div>
                                    <span className="font-bold text-white tracking-wide">{selectedChat.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Chat History Placeholder */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Decorative background logo */}
                            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none md:ml-[175px]">
                                <img src="/bat.svg" alt="" className="w-96 h-96 grayscale drop-shadow-[0_0_50px_rgba(0,0,0,1)]" />
                            </div>

                            <div className="text-center text-xs text-gray-600 uppercase font-mono tracking-widest my-8 opacity-50 relative z-10">
                                Connection Encrypted. Direct Link Established.
                            </div>

                            {/* Incoming */}
                            <div className="flex space-x-3 max-w-[80%] relative z-10 items-end">
                                <img src={`https://ui-avatars.com/api/?name=${selectedChat.name}&background=000&color=fff&size=30`} className="w-8 h-8 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
                                <div className="bg-dark-surface border border-dark-border text-white px-4 py-3 rounded-2xl rounded-bl-sm text-sm shadow-md font-mono">
                                    {selectedChat.message}
                                </div>
                            </div>

                            {/* Outgoing */}
                            <div className="flex space-x-3 max-w-[80%] ml-auto relative z-10 items-end justify-end">
                                <div className="bg-blood/90 border border-red-900 text-white px-4 py-3 rounded-2xl rounded-br-sm text-sm shadow-[0_0_10px_rgba(136,8,8,0.3)] shadow-red-900/50">
                                    Acknowledged.
                                </div>
                            </div>
                        </div>

                        {/* Message Input Region */}
                        <div className="p-4 bg-dark-bg border-t border-dark-border sticky bottom-0 z-20">
                            <div className="border border-dark-border bg-dark-surface rounded-full flex items-center px-2 py-1 shadow-inner ring-1 ring-black focus-within:ring-blood/50 focus-within:border-blood/50 transition-all duration-300">
                                <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                    <PlusCircle size={24} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Message..."
                                    className="flex-1 bg-transparent text-sm text-white focus:outline-none px-2 py-2 font-mono"
                                />
                                <div className="flex space-x-1 mr-2 text-gray-500">
                                    <button className="p-2 hover:text-white transition-colors">
                                        <Mic size={22} className="hover:text-blood drop-shadow-[0_0_5px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                                    </button>
                                    <button className="p-2 hover:text-white transition-colors">
                                        <Image size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-24 h-24 border-2 border-blood rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(136,8,8,0.2)] bg-black">
                            <img src="/bat.svg" className="w-12 h-12 opacity-80" />
                        </div>
                        <h3 className="text-2xl font-serif text-white uppercase tracking-widest mb-2 shadow-black drop-shadow-lg">Your Transmissions</h3>
                        <p className="text-gray-500 text-sm max-w-sm font-mono leading-relaxed">End-to-end encrypted direct frequencies. Only authorized personnel can decrypt.</p>
                        <button className="mt-8 bg-blood hover:bg-red-800 text-white font-bold py-2.5 px-8 rounded-full shadow-[0_0_20px_rgba(136,8,8,0.6)] transition-all uppercase tracking-wider text-sm">
                            Send Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
