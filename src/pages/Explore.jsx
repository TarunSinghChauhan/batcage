import React, { useState, useEffect } from 'react';
import GlobalSearch from '../components/UI/GlobalSearch';
import { motion } from 'framer-motion';

const exploreItems = [
    'batman', 'joker', 'superman', 'car', 'bike',
    'gotham', 'darkness', 'hero', 'villain', 'night',
    'comic', 'action', 'musclecar', 'motorcycle', 'cityscape'
];

const Explore = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('batcave_posts') || '[]');
        setPosts(savedPosts);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-8 space-y-8 page-transition"
        >
            <div className="max-w-md mx-auto sticky top-4 z-50">
                <GlobalSearch posts={posts} />
            </div>

            <div className="space-y-4">
                <h2 className="text-[10px] font-black tracking-[0.5em] text-bat-purple uppercase border-b border-bat-purple/20 pb-2">Intercepted Visuals Feed</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pb-16">
                    {exploreItems.map((keyword, i) => (
                        <div key={i} className="aspect-square bg-black border border-white/5 cursor-pointer hover:border-bat-purple/50 transition-all duration-500 overflow-hidden group rounded-xl relative">
                            <img
                                src={`https://loremflickr.com/500/500/${keyword}?lock=${i}`}
                                alt={keyword}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-100"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <span className="text-[9px] font-mono text-white tracking-widest uppercase truncate">{keyword} frequency detected</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Explore;
