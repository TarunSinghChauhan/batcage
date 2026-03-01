import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post }) => {
    const { requireAuth } = useAuth();
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

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

    const likeAnimation = liked ? "text-blood scale-110 drop-shadow-[0_0_10px_rgba(136,8,8,0.8)]" : "text-gray-400 hover:text-gray-200";

    return (
        <article className="bg-dark-surface sm:rounded-lg border-y sm:border border-dark-border mb-6 flex flex-col pt-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3">
                <div className="flex items-center space-x-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-blood/50">
                        <img src={post.userAvatar || `https://ui-avatars.com/api/?name=${post.username}&background=000&color=fff`} alt={post.username} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-wide">{post.username}</h3>
                        <span className="text-xs text-gray-500">{post.location || 'Gotham City'}</span>
                    </div>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Image */}
            <div className="relative w-full aspect-square bg-black border-y border-dark-border">
                {/* Replace with actual image lazy load logic later */}
                <img
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000&auto=format&fit=crop'}
                    alt="Post content"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Actions */}
            <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-5">
                        <button onClick={handleLike} className={`transition-all duration-300 transform active:scale-75 ${likeAnimation}`}>
                            <Heart size={26} fill={liked ? '#880808' : 'none'} strokeWidth={1.5} />
                        </button>
                        <button onClick={handleComment} className="text-gray-400 hover:text-white transition-colors">
                            <MessageCircle size={26} strokeWidth={1.5} />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Share2 size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                    <button onClick={handleSave} className="text-gray-400 hover:text-white transition-colors">
                        <Bookmark size={24} fill={saved ? '#fff' : 'none'} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Likes Count */}
                <div className="font-semibold text-white mb-2 text-sm tracking-wide">
                    {liked ? post.likes + 1 : post.likes} likes
                </div>

                {/* Caption */}
                <div className="text-sm text-gray-200">
                    <span className="font-semibold text-white mr-2">{post.username}</span>
                    <span>{post.caption}</span>
                </div>

                {/* Comments link */}
                <button onClick={handleComment} className="text-gray-500 text-sm mt-3 mb-1 capitalize hover:text-gray-400">
                    View all {post.commentsCount} comments
                </button>

                <div className="text-xs text-gray-600 mt-2 uppercase tracking-wide">
                    {post.timestamp || '2 HOURS AGO'}
                </div>
            </div>
        </article>
    );
};

export default PostCard;
