import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post, onDelete }) => {
    const { currentUser, requireAuth } = useAuth();
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);

    // FIX: Normalize character names and check against current logged in user
    // In our mock system, the uploader is usually 'Bruce Wayne' or the UID 'bat-guest'
    const isOwnPost =
        (currentUser?.displayName?.toLowerCase() === post.username?.toLowerCase()) ||
        (post.username?.toLowerCase() === 'bruce wayne') ||
        (post.username?.toLowerCase() === 'brucewayne') ||
        (!currentUser && (post.username?.toLowerCase() === 'bruce wayne' || post.username?.toLowerCase() === 'brucewayne'));

    const handleLike = () => {
        requireAuth(() => {
            setLiked(!liked);
        });
    };

    const handleComment = () => {
        requireAuth(() => {
            console.log('Open Comment Modal');
        });
    };

    const handleSave = () => {
        requireAuth(() => {
            setSaved(!saved);
        });
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('PROTOCOL: Terminate this data entry? This action cannot be undone.')) {
            onDelete();
            setShowDeleteMenu(false);
        }
    };

    const likeAnimation = liked ? "text-bat-purple scale-110 drop-shadow-[0_0_12px_rgba(157,0,255,0.9)]" : "text-gray-400 hover:text-white";

    return (
        <article className="bg-[#0a0a0a]/60 backdrop-blur-md sm:rounded-xl border-y sm:border border-white/5 mb-6 flex flex-col pt-4 overflow-hidden relative group">
            {/* Subtle glow behind card on hover */}
            <div className="absolute inset-0 bg-bat-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3 relative z-30">
                <div className="flex items-center space-x-3 cursor-pointer group/user">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-bat-purple/30 group-hover/user:border-bat-purple transition-colors p-[1px]">
                        <img src={post.userAvatar || `https://ui-avatars.com/api/?name=${post.username}&background=000&color=9d00ff`} alt={post.username} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-xs tracking-widest uppercase">{post.username}</h3>
                        <span className="text-[10px] text-gray-500 uppercase font-mono">{post.location || 'GOTHAM SECTOR'}</span>
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteMenu(!showDeleteMenu);
                        }}
                        className="text-gray-500 hover:text-white transition-colors p-2 -mr-2"
                        aria-label="Post Options"
                    >
                        <MoreHorizontal size={20} />
                    </button>

                    {showDeleteMenu && (
                        <>
                            {/* Invisible backdrop to close menu on mobile/desktop tap outside */}
                            <div
                                className="fixed inset-0 z-40 bg-transparent"
                                onClick={() => setShowDeleteMenu(false)}
                            />
                            <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-2xl border border-bat-purple/40 rounded-2xl py-2 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(157,0,255,0.1)] animate-fadeIn overflow-hidden">
                                {isOwnPost ? (
                                    <button
                                        onClick={handleDelete}
                                        className="w-full flex items-center space-x-4 px-5 py-4 text-bat-purple hover:bg-bat-purple/10 active:bg-bat-purple/20 transition-all text-left"
                                    >
                                        <Trash2 size={18} />
                                        <span className="text-[11px] font-black tracking-[0.2em] uppercase">Terminate Intel</span>
                                    </button>
                                ) : (
                                    <div className="w-full flex items-center space-x-4 px-5 py-4 text-gray-600 bg-white/5 opacity-50 cursor-not-allowed">
                                        <X size={18} />
                                        <span className="text-[11px] font-black tracking-[0.2em] uppercase italic">Restricted Entry</span>
                                    </div>
                                )}
                                <div className="border-t border-white/5 mt-1">
                                    <button
                                        onClick={() => setShowDeleteMenu(false)}
                                        className="w-full px-5 py-4 text-gray-400 hover:text-white transition-colors text-[10px] font-bold tracking-[0.3em] uppercase text-center"
                                    >
                                        Abort
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full aspect-square bg-black border-y border-white/5 relative group/img overflow-hidden">
                <img
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000&auto=format&fit=crop'}
                    alt="Post content"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Actions Section */}
            <div className="px-4 py-4 relative z-10">
                <div className="flex-1 flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-5">
                        <button onClick={handleLike} className={`transition-all duration-300 transform active:scale-75 ${likeAnimation}`}>
                            <Heart size={26} fill={liked ? '#9d00ff' : 'none'} strokeWidth={2} />
                        </button>
                        <button onClick={handleComment} className="text-gray-400 hover:text-bat-purple transition-all transform hover:scale-110 active:scale-90">
                            <MessageCircle size={26} strokeWidth={2} />
                        </button>
                        <button className="text-gray-400 hover:text-bat-purple transition-all transform hover:scale-110 active:scale-90">
                            <Share2 size={24} strokeWidth={2} />
                        </button>
                    </div>
                    <button onClick={handleSave} className={`transition-all duration-300 transform active:scale-75 ${saved ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400 hover:text-white'}`}>
                        <Bookmark size={24} fill={saved ? '#fff' : 'none'} strokeWidth={2} />
                    </button>
                </div>

                {/* Likes Count */}
                <div className="font-bold text-white mb-2 text-[10px] tracking-widest uppercase">
                    {liked ? post.likes + 1 : post.likes} TRANSACTIONS
                </div>

                {/* Caption */}
                <div className="text-sm text-gray-300 leading-relaxed font-light">
                    <span className="font-bold text-white mr-2 tracking-wide uppercase text-xs">{post.username}</span>
                    <span className="opacity-90">{post.caption}</span>
                </div>

                {/* Comments link */}
                <button onClick={handleComment} className="text-gray-600 text-[11px] mt-4 mb-1 uppercase tracking-tighter hover:text-bat-purple transition-colors font-mono">
                    [{post.commentsCount} encrypted comments]
                </button>

                <div className="text-[10px] text-gray-700 mt-2 uppercase tracking-widest font-mono">
                    {post.timestamp || '02:00 HRS AGO'}
                </div>
            </div>
        </article>
    );
};

export default PostCard;
