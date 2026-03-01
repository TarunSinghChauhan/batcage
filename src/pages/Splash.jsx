import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 2500); // 2.5s splash

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blood/20 via-black to-black opacity-50"></div>

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="z-10 flex flex-col items-center"
            >
                <motion.img
                    src="/bat.svg"
                    alt="Bat Cave"
                    className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_20px_rgba(136,8,8,0.8)] filter transition-all"
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />

                <motion.h1
                    className="mt-8 text-4xl md:text-6xl font-extrabold tracking-[0.2em] font-serif uppercase text-white drop-shadow-[0_0_10px_rgba(136,8,8,0.5)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Bat Cave
                </motion.h1>

                <motion.p
                    className="mt-4 text-blood/80 tracking-widest text-sm uppercase font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    Enter The Shadows
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Splash;
