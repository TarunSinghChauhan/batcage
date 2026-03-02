import React from 'react';

const BatLogo = ({ size = 48, className = "" }) => {
    return (
        <div
            style={{ width: size, height: size }}
            className={`relative group flex-shrink-0 ${className}`}
        >
            <div className={`absolute -inset-1 bg-bat-purple rounded-full blur opacity-25 group-hover:opacity-60 transition duration-300`}></div>
            <img
                src="/batcage/app-logo.jpg"
                alt="Bat Logo"
                className="w-full h-full object-cover rounded-full border border-bat-purple/40 shadow-[0_0_15px_rgba(157,0,255,0.3)] relative z-10"
            />
        </div>
    );
};

export default BatLogo;
