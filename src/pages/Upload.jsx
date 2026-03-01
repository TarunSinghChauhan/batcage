import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            const url = URL.createObjectURL(selected);
            setPreviewUrl(url);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange({ target: { files: [e.dataTransfer.files[0]] } });
        }
    };

    const clearFile = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null);
        setPreviewUrl('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPost = {
                    id: Date.now(),
                    username: currentUser?.displayName || 'brucewayne',
                    imageUrl: reader.result,
                    likes: 0,
                    caption: caption,
                    commentsCount: 0,
                    timestamp: 'JUST NOW',
                    location: 'Gotham City'
                };
                const existing = JSON.parse(localStorage.getItem('batcave_posts') || '[]');
                localStorage.setItem('batcave_posts', JSON.stringify([newPost, ...existing]));

                setIsUploading(false);
                navigate('/home');
            };
            if (file) reader.readAsDataURL(file);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-blood/30">
                <h2 className="text-2xl font-bold font-serif uppercase tracking-widest text-shadow-blood flex items-center gap-2">
                    <Sparkles className="text-blood" size={24} /> New Intel
                </h2>
                {previewUrl && (
                    <button
                        disabled={isUploading}
                        onClick={handleSubmit}
                        className="bg-blood hover:bg-red-800 text-white px-6 py-1.5 rounded text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 shadow-[0_0_15px_rgba(136,8,8,0.5)] border border-transparent disabled:border-blood"
                    >
                        {isUploading ? 'Transmitting...' : 'Share'}
                    </button>
                )}
            </div>

            <div className="flex-1 flex flex-col max-h-[70vh]">
                {!previewUrl ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="flex-1 border-2 border-dashed border-dark-border hover:border-blood/50 rounded-xl flex flex-col items-center justify-center bg-dark-surface/50 cursor-pointer transition-all hover:bg-dark-surface group group-hover:shadow-[inset_0_0_20px_rgba(136,8,8,0.1)]"
                    >
                        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <UploadIcon size={40} className="text-gray-400 group-hover:text-blood drop-shadow-[0_0_5px_rgba(136,8,8,0)] group-hover:drop-shadow-[0_0_8px_rgba(136,8,8,0.8)] transition-all" />
                        </div>
                        <p className="text-xl font-medium tracking-wide text-gray-300 mb-2 font-serif uppercase">Drop your visual evidence</p>
                        <p className="text-sm text-gray-500">Or click to browse encrypted files</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                            className="hidden"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6 h-full">
                        <div className="md:w-1/2 aspect-square relative bg-black rounded-lg overflow-hidden border border-dark-border">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain mix-blend-screen opacity-90" />
                            <button
                                onClick={clearFile}
                                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-blood rounded-full text-white backdrop-blur-sm transition-colors border border-gray-600 hover:border-blood"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="md:w-1/2 flex flex-col">
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Write a caption... (encrypted)"
                                className="w-full flex-1 min-h-[150px] bg-dark-surface border border-dark-border rounded-lg p-4 text-white focus:outline-none focus:border-blood/50 resize-none transition-colors shadow-inner font-mono text-sm"
                            />

                            <div className="mt-4 flex items-center justify-between text-gray-400 border-t border-dark-border pt-4">
                                <button className="flex items-center space-x-2 hover:text-white transition-colors">
                                    <ImageIcon size={20} />
                                    <span className="text-sm">Tag Personnel</span>
                                </button>
                                <span className="text-xs">{caption.length}/2200</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upload;
