import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, Image as ImageIcon, Video, Bookmark, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { id } = useParams();
    const { currentUser, requireAuth } = useAuth();
    const isOwnProfile = currentUser?.uid === id;

    const handleEditProfile = () => {
        requireAuth(() => console.log('Edit profile'));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto py-8 px-4 md:px-8 page-transition pb-24"
        >
            {/* Profile Header */}
            <header className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 mb-16 relative">
                <div className="relative group mb-8 md:mb-0">
                    <div className="absolute -inset-1.5 bg-bat-purple/30 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-bat-purple/40 overflow-hidden flex-shrink-0 p-1 bg-black shadow-[0_0_30px_rgba(136,8,8,0.2)]">
                        <img
                            src={`https://ui-avatars.com/api/?name=${id || 'Bruce'}&background=000&color=9d00ff&size=200`}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-100"
                        />
                    </div>
                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-black border border-bat-purple/50 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center neon-glow">
                        <ShieldCheck size={14} className="text-bat-purple md:hidden" />
                        <ShieldCheck size={18} className="text-bat-purple hidden md:block" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-2">
                    <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-6">
                        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-[0.2em] mb-4 md:mb-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            {currentUser?.displayName || 'BRUCE WAYNE'}
                        </h2>
                        <div className="flex space-x-3">
                            {isOwnProfile ? (
                                <button onClick={handleEditProfile} className="bg-bat-purple/10 border border-bat-purple/40 text-bat-purple px-6 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-bat-purple hover:text-white transition-all shadow-[0_0_15px_rgba(136,8,8,0.1)]">
                                    Override Settings
                                </button>
                            ) : (
                                <button className="bg-bat-purple hover:bg-purple-800 text-white px-8 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-[0_0_20px_rgba(136,8,8,0.4)] transition-all">
                                    Initiate Link
                                </button>
                            )}
                            {isOwnProfile && (
                                <button className="p-2 border border-white/5 bg-white/5 rounded-xl hover:bg-bat-purple/20 hover:border-bat-purple/50 transition-all group">
                                    <Settings size={20} className="text-gray-500 group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-10 mb-8 text-[11px] font-bold tracking-widest uppercase font-mono">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-white text-lg">03</span>
                            <span className="text-gray-600">INTEL</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-white text-lg">8.2M</span>
                            <span className="text-gray-600">OPERATIVES</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-white text-lg">01</span>
                            <span className="text-gray-600">MONITORED</span>
                        </div>
                    </div>

                    <div className="text-[11px] leading-relaxed max-w-sm">
                        <h3 className="font-black text-bat-purple uppercase tracking-[0.3em] mb-2 font-serif">Mission Profile</h3>
                        <p className="whitespace-pre-wrap text-gray-400 font-mono tracking-tighter opacity-80 uppercase leading-loose">
                            [OBJECTIVE]: Vengeance. Justice.<br />
                            [LOCATION]: Gotham Inner Sanctum.<br />
                            [STATUS]: Operating in Shadows.
                        </p>
                    </div>
                </div>
            </header>

            {/* Profile Navigation Tabs */}
            <div className="border-t border-bat-purple/10 flex justify-center sticky top-[72px] bg-black/40 backdrop-blur-xl z-20">
                <button className="flex items-center space-x-2 border-t-2 border-bat-purple px-10 py-5 -mt-[2px] text-white">
                    <ImageIcon size={14} className="text-bat-purple" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">Visuals</span>
                </button>
                <button onClick={() => requireAuth(() => { })} className="flex items-center space-x-2 border-t-2 border-transparent px-10 py-5 -mt-[2px] text-gray-600 hover:text-white transition-colors group">
                    <Video size={14} className="group-hover:text-bat-purple transition-colors" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">Surveillance</span>
                </button>
                {isOwnProfile && (
                    <button className="flex items-center space-x-2 border-t-2 border-transparent px-10 py-5 -mt-[2px] text-gray-600 hover:text-white transition-colors group">
                        <Bookmark size={14} className="group-hover:text-bat-purple transition-colors" />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase">Archived</span>
                    </button>
                )}
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-4 mt-8">
                {['batmobile', 'joker', 'darkknight'].map((keyword, i) => (
                    <div key={i} className="aspect-square bg-black border border-white/5 cursor-pointer group relative overflow-hidden rounded-xl">
                        <img
                            src={`https://loremflickr.com/500/500/${keyword}?lock=${i + 10}`}
                            alt="Intel"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 brightness-50 group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-bat-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Profile;
