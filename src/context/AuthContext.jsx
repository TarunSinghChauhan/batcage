import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../services/firebase';
// Mock import for now to get app running without valid firebase credentials
const auth = { onAuthStateChanged: (cb) => { cb(null); return () => { }; } };

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async () => {
        // Implement real login later
        setCurrentUser({ uid: 'bat-guest', displayName: 'Bruce Wayne' });
        setAuthModalOpen(false);
    };

    const logout = async () => {
        // Implement real logout later
        setCurrentUser(null);
    };

    const requireAuth = (action) => {
        if (currentUser) {
            action();
        } else {
            setAuthModalOpen(true);
        }
    };

    const value = {
        currentUser,
        login,
        logout,
        authModalOpen,
        setAuthModalOpen,
        requireAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
