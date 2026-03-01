import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User as UserIcon, LogIn } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate auth delay
        setTimeout(() => {
            login();
            setIsLoading(false);
            navigate('/home');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
                <img src="/bat.svg" alt="" className="w-full max-w-4xl h-auto grayscale filter contrast-200 blur-sm mix-blend-screen opacity-10" />
            </div>

            <div className="max-w-md w-full space-y-8 bg-dark-surface/90 backdrop-blur-md p-10 rounded-2xl border border-blood/20 shadow-[0_0_50px_rgba(136,8,8,0.15)] relative z-10">
                <div className="text-center">
                    <img src="/bat.svg" alt="Logo" className="mx-auto h-16 w-16 mb-6 drop-shadow-[0_0_10px_rgba(136,8,8,0.8)] filter brightness-150" />
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-widest uppercase font-serif drop-shadow-lg text-shadow-blood">
                        {isLogin ? 'Enter The Cave' : 'Join The Shadows'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400 font-mono tracking-wide">
                        Authentication required for encrypted access.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <label className="sr-only">Alias</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-dark-border bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-blood/50 focus:border-blood/50 focus:z-10 sm:text-sm font-mono shadow-inner transition-colors transition-shadow hover:border-gray-600 focus:shadow-[0_0_10px_rgba(136,8,8,0.3)]"
                                    placeholder="Codename / Alias"
                                />
                            </div>
                        )}
                        <div className="relative">
                            <label className="sr-only">Email address</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-dark-border bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-blood/50 focus:border-blood/50 focus:z-10 sm:text-sm font-mono shadow-inner transition-colors transition-shadow hover:border-gray-600 focus:shadow-[0_0_10px_rgba(136,8,8,0.3)]"
                                placeholder="Secure frequency ID"
                            />
                        </div>
                        <div className="relative">
                            <label className="sr-only">Passphrase</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-dark-border bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-blood/50 focus:border-blood/50 focus:z-10 sm:text-sm font-mono shadow-inner transition-colors transition-shadow hover:border-gray-600 focus:shadow-[0_0_10px_rgba(136,8,8,0.3)]"
                                placeholder="Decryption key"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blood hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blood/50 focus:ring-offset-black transition-all duration-300 uppercase tracking-widest hover:shadow-[0_0_20px_rgba(136,8,8,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LogIn className="h-5 w-5 text-white/50 group-hover:text-white/80 transition-colors" />
                            </span>
                            {isLoading ? 'Decrypting...' : (isLogin ? 'Initialize Uplink' : 'Register Signature')}
                        </button>
                    </div>
                </form>

                <div className="flex items-center justify-between text-sm border-t border-dark-border pt-6 font-mono">
                    <button
                        onClick={() => navigate('/home')}
                        className="font-medium text-gray-500 hover:text-white transition-colors uppercase tracking-wider text-xs"
                    >
                        Bypass / Guest
                    </button>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-blood hover:text-red-500 transition-colors uppercase tracking-wider text-xs hover:shadow-blood drop-shadow-lg"
                    >
                        {isLogin ? 'New Recruit?' : 'Already Cleared?'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
