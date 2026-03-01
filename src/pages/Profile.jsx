import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, Image as ImageIcon, Video, Bookmark } from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const { currentUser, requireAuth } = useAuth();

    const isOwnProfile = currentUser?.uid === id;

    const handleEditProfile = () => {
        requireAuth(() => console.log('Edit profile'));
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Profile Header */}
            <header className="flex flex-col md:flex-row items-center md:items-start md:space-x-12 mb-12">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-blood overflow-hidden flex-shrink-0 mb-6 md:mb-0 shadow-[0_0_20px_rgba(136,8,8,0.3)]">
                    <img
                        src={`https://ui-avatars.com/api/?name=${id || 'Bruce'}&background=000&color=fff&size=150`}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </div>

                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-4">
                        <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-widest mb-3 md:mb-0">
                            {currentUser?.displayName || 'Bruce Wayne'}
                        </h2>
                        <div className="flex space-x-3">
                            {isOwnProfile ? (
                                <button onClick={handleEditProfile} className="bg-dark-surface border border-dark-border text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blood/20 hover:border-blood transition-colors">
                                    Edit Profile
                                </button>
                            ) : (
                                <button className="bg-blood hover:bg-red-800 text-white px-6 py-1.5 rounded text-sm font-semibold shadow-[0_0_10px_rgba(136,8,8,0.5)] transition-all">
                                    Follow
                                </button>
                            )}
                            {isOwnProfile && (
                                <button className="p-1.5 hover:rotate-90 transition-transform duration-300">
                                    <Settings size={22} className="text-gray-400 hover:text-white" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-8 mb-4 text-sm md:text-base font-medium">
                        <div><span className="font-bold text-white mr-1.5">3</span><span className="text-gray-400">Posts</span></div>
                        <div><span className="font-bold text-white mr-1.5">8M</span><span className="text-gray-400">Followers</span></div>
                        <div><span className="font-bold text-white mr-1.5">1</span><span className="text-gray-400">Following</span></div>
                    </div>

                    <div className="text-sm">
                        <h3 className="font-bold text-white mb-1">Vengeance</h3>
                        <p className="whitespace-pre-wrap text-gray-300 max-w-sm">I am the shadows.\nGotham City.</p>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="border-t border-dark-border flex justify-center mt-6">
                <button className="flex items-center space-x-2 border-t border-white px-8 py-4 -mt-[1px] text-white">
                    <ImageIcon size={16} />
                    <span className="text-xs font-bold tracking-widest uppercase">Posts</span>
                </button>
                <button onClick={() => requireAuth(() => { })} className="flex items-center space-x-2 border-t border-transparent px-8 py-4 -mt-[1px] text-gray-500 hover:text-white transition-colors">
                    <Video size={16} />
                    <span className="text-xs font-bold tracking-widest uppercase">Reels</span>
                </button>
                {isOwnProfile && (
                    <button className="flex items-center space-x-2 border-t border-transparent px-8 py-4 -mt-[1px] text-gray-500 hover:text-white transition-colors">
                        <Bookmark size={16} />
                        <span className="text-xs font-bold tracking-widest uppercase">Saved</span>
                    </button>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-4 mt-2">
                {['batmobile', 'joker', 'darkknight'].map((keyword, i) => (
                    <div key={i} className="aspect-square bg-dark-surface cursor-pointer group relative overflow-hidden">
                        <img src={`https://loremflickr.com/300/300/${keyword}?lock=${i}`} alt="Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
