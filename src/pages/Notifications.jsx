import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, UserPlus, Heart, MessageSquare } from 'lucide-react';

const mockNotifications = [
    { id: 1, type: 'follow', user: 'Catwoman', time: '1h', read: false },
    { id: 2, type: 'like', user: 'Nightwing', time: '3h', read: true, target: 'post' },
    { id: 3, type: 'comment', user: 'Oracle', time: '5h', read: true, target: 'post', content: 'Incredible work on the evidence.' },
    { id: 4, type: 'alert', user: 'System', time: '1d', read: true, content: 'Signal activated in Gotham Square.' }
];

const Notifications = () => {
    const { requireAuth, currentUser } = useAuth();

    if (!currentUser) {
        // This handles cases where user navigates directly
        requireAuth(() => { });
        return <div className="p-4 text-center mt-20 text-gray-500">Authentication Required.</div>;
    }

    return (
        <div className="max-w-xl mx-auto py-6 px-4">
            <div className="flex items-center space-x-3 mb-6">
                <Bell size={24} className="text-blood drop-shadow-[0_0_8px_rgba(136,8,8,0.8)]" />
                <h2 className="text-2xl font-bold font-serif uppercase tracking-wider">Alerts</h2>
            </div>

            <div className="space-y-4">
                {mockNotifications.map((notif) => (
                    <div key={notif.id} className={`flex items-start space-x-4 p-4 rounded-lg bg-dark-surface border border-dark-border transition-colors hover:border-blood/30 ${!notif.read ? 'border-l-4 border-l-blood bg-dark-surface/80' : ''}`}>
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-full shadow-inner bg-black border border-gray-800 flex items-center justify-center shrink-0">
                            {notif.type === 'follow' && <UserPlus size={18} className="text-blue-500" />}
                            {notif.type === 'like' && <Heart size={18} fill="#880808" stroke="none" className="drop-shadow-[0_0_5px_rgba(136,8,8,0.8)]" />}
                            {notif.type === 'comment' && <MessageSquare size={18} className="text-gray-300" />}
                            {notif.type === 'alert' && <Bell size={18} className="text-yellow-500 animate-pulse" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <p className="text-sm text-gray-300">
                                <span className="font-bold text-white tracking-wide mr-1">{notif.user}</span>
                                {notif.type === 'follow' && 'started tracking your movements.'}
                                {notif.type === 'like' && 'acknowledged your transmission.'}
                                {notif.type === 'comment' && `decoded your transmission: "${notif.content}"`}
                                {notif.type === 'alert' && notif.content}
                            </p>
                            <span className="text-xs text-gray-600 mt-1 uppercase font-semibold">{notif.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
