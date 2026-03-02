import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 3000); // 3s splash

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bat-purple/20 via-black to-black opacity-50"></div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="z-10 flex flex-col items-center"
            >
                <div className="relative group">
                    <div className="absolute -inset-4 bg-bat-purple rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <motion.img
                        src="/batcage/app-logo.jpg"
                        alt="Bat Cave Logo"
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-bat-purple/30 shadow-[0_0_50px_rgba(157,0,255,0.4)] object-cover"
                        initial={{ rotate: -5, scale: 0.9 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                </div>

                <motion.h1
                    className="mt-12 text-5xl md:text-7xl font-black tracking-[0.3em] font-serif uppercase text-white drop-shadow-[0_0_20px_rgba(157,0,255,0.6)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    Bat Cave
                </motion.h1>

                <motion.p
                    className="mt-6 text-bat-purple tracking-[0.5em] text-sm uppercase font-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    Ignite The Night
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Splash;
