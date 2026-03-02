import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';

const AuthModal = () => {
    const { authModalOpen, setAuthModalOpen, login } = useAuth();

    return (
        <AnimatePresence>
            {authModalOpen && (
                <React.Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setAuthModalOpen(false)}
                        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-dark-surface border border-bat-purple/20 p-8 rounded-lg max-w-sm w-full mx-4 shadow-2xl shadow-bat-purple/10 pointer-events-auto relative"
                        >
                            <button
                                onClick={() => setAuthModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 mx-auto bg-black border border-bat-purple rounded-full flex items-center justify-center mb-4">
                                    <img src="/bat.svg" alt="Bat" className="w-8 h-8 opacity-80" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-white mb-2 font-serif uppercase stamp">
                                    Enter The Bat Cave
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    Login required to continue your journey into the shadows.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={login}
                                    className="w-full bg-bat-purple hover:bg-purple-800 text-white font-medium py-3 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(136,8,8,0.5)] flex justify-center items-center space-x-2"
                                >
                                    <span>Sign In</span>
                                </button>
                                <button
                                    onClick={() => setAuthModalOpen(false)}
                                    className="w-full bg-transparent border border-dark-border hover:border-bat-purple/50 text-gray-300 font-medium py-3 rounded-md transition-all duration-300"
                                >
                                    Continue as Guest
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
