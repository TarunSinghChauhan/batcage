import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GlobalSearch = ({ posts = [], onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ users: [], posts: [] });
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (query.trim().length > 0) {
            const lowerQuery = query.toLowerCase();

            // Search users
            const uniqueUsers = [...new Set(posts.map(p => p.username))]
                .filter(u => u.toLowerCase().includes(lowerQuery))
                .map(u => ({ username: u, type: 'user' }));

            // Search post captions
            const matchingPosts = posts.filter(p =>
                p.caption.toLowerCase().includes(lowerQuery) ||
                p.username.toLowerCase().includes(lowerQuery)
            ).map(p => ({ ...p, type: 'post' }));

            setResults({
                users: uniqueUsers.slice(0, 5),
                posts: matchingPosts.slice(0, 5)
            });
        } else {
            setResults({ users: [], posts: [] });
        }
    }, [query, posts]);

    const handleSelect = (item) => {
        if (item.type === 'user') {
            navigate(`/profile/${item.username}`);
        } else {
            // Navigate to post or scroll to it
            navigate('/home');
        }
        if (onClose) onClose();
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className={`h-4 w-4 transition-colors ${query ? 'text-bat-purple' : 'text-gray-500'}`} />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    className="block w-full bg-black/40 border border-bat-purple/20 rounded-xl py-2.5 pl-10 pr-10 text-sm placeholder-gray-600 focus:outline-none focus:border-bat-purple/50 focus:ring-1 focus:ring-bat-purple/50 transition-all font-mono tracking-wider text-white"
                    placeholder="INITIATING SEARCH..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {query.trim().length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-bat-purple/30 rounded-xl overflow-hidden z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                    >
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {results.users.length === 0 && results.posts.length === 0 ? (
                                <div className="p-8 text-center">
                                    <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">No results found in local database</p>
                                </div>
                            ) : (
                                <>
                                    {results.users.length > 0 && (
                                        <div className="p-2 border-b border-white/5">
                                            <p className="px-3 py-2 text-[10px] font-black text-bat-purple uppercase tracking-widest">Identified Subjects</p>
                                            {results.users.map((user, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSelect(user)}
                                                    className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-bat-purple/10 rounded-lg transition-colors group"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-dark-bg border border-bat-purple/30 flex items-center justify-center p-0.5">
                                                        <img src={`https://ui-avatars.com/api/?name=${user.username}&background=000&color=9d00ff`} className="w-full h-full rounded-full" />
                                                    </div>
                                                    <span className="text-sm text-gray-300 font-bold tracking-wide group-hover:text-white uppercase">{user.username}</span>
                                                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-bat-purple transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {results.posts.length > 0 && (
                                        <div className="p-2">
                                            <p className="px-3 py-2 text-[10px] font-black text-bat-purple uppercase tracking-widest">Intercepted Data</p>
                                            {results.posts.map((post, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSelect(post)}
                                                    className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-bat-purple/10 rounded-lg transition-colors group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-dark-bg border border-bat-purple/30 overflow-hidden shrink-0">
                                                        <img src={post.imageUrl} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex flex-col items-start truncate overflow-hidden">
                                                        <span className="text-[10px] text-bat-purple font-black uppercase">{post.username}</span>
                                                        <span className="text-xs text-gray-400 font-light truncate w-full">{post.caption}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="bg-bat-purple/5 flex justify-center py-2 border-t border-white/5">
                            <span className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.3em]">Encrypted Search Protocol v2.4</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GlobalSearch;
