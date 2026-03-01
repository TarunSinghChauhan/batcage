import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, MessageCircle, Share2, MoreVertical, Music } from 'lucide-react';

const Reels = () => {
    const { requireAuth } = useAuth();

    return (
        <div className="h-[calc(100vh-4rem)] md:h-screen bg-black flex snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-hide snap-always">
            <div className="w-full max-w-[400px] h-full relative snap-center snap-always mx-auto flex items-center justify-center border border-dark-border/50">

                {/* Placeholder video area */}
                <div className="absolute inset-0 bg-dark-surface/50 flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/80 absolute inset-0 z-10 pointer-events-none" />
                    <img
                        src="https://images.unsplash.com/photo-1547844111-ce1ef929ee0e?q=80&w=1000"
                        alt="Reel background placeholder"
                        className="w-full h-full object-cover opacity-80 scale-105"
                    />
                </div>

                {/* Overlay controls */}
                <div className="absolute bottom-4 left-4 right-16 z-20 text-white">
                    <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 rounded-full border border-blood overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Joker&background=000&color=fff" alt="User" />
                        </div>
                        <span className="font-semibold text-sm">the_joker</span>
                        <button className="text-xs border border-white px-2 py-0.5 rounded ml-2 hover:bg-white hover:text-black transition-colors font-medium">Follow</button>
                    </div>
                    <p className="text-sm mb-2 font-medium drop-shadow-md">Why so serious? 🦇 #gotham #nights</p>
                    <div className="flex items-center text-xs space-x-2 py-1 px-2 bg-black/40 rounded-full w-max border border-gray-700/50 backdrop-blur-sm">
                        <Music size={12} className="animate-spin-slow" />
                        <span className="marquee">Original Audio - the_joker</span>
                    </div>
                </div>

                {/* Right action bar */}
                <div className="absolute bottom-4 right-2 z-20 flex flex-col items-center space-y-5 text-white">
                    <button className="flex flex-col items-center justify-center group" onClick={() => requireAuth(() => { })}>
                        <div className="bg-black/40 p-2 rounded-full mb-1 group-hover:bg-blood/20 transition-colors border border-transparent group-hover:border-blood/50">
                            <Heart size={26} className="group-hover:text-blood group-hover:fill-blood drop-shadow-lg" />
                        </div>
                        <span className="text-xs font-semibold drop-shadow-md">45.2K</span>
                    </button>

                    <button className="flex flex-col items-center justify-center group" onClick={() => requireAuth(() => { })}>
                        <div className="bg-black/40 p-2 rounded-full mb-1 group-hover:bg-white/20 transition-colors border border-transparent group-hover:border-white/50">
                            <MessageCircle size={26} className="drop-shadow-lg" />
                        </div>
                        <span className="text-xs font-semibold drop-shadow-md">1,204</span>
                    </button>

                    <button className="flex flex-col items-center justify-center group">
                        <div className="bg-black/40 p-2 rounded-full mb-1 group-hover:bg-white/20 transition-colors border border-transparent group-hover:border-white/50">
                            <Share2 size={26} className="drop-shadow-lg" />
                        </div>
                        <span className="text-xs font-semibold drop-shadow-md">Share</span>
                    </button>

                    <button className="p-2">
                        <MoreVertical size={24} className="drop-shadow-lg" />
                    </button>

                    <div className="w-8 h-8 rounded border-2 border-white overflow-hidden mt-2 p-[1px]">
                        <img src="https://ui-avatars.com/api/?name=Jo&background=000&color=fff" alt="Audio cover" className="w-full h-full rounded-sm object-cover" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reels;
