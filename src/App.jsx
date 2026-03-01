import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useBatAnimation } from './hooks/useBatAnimation';
import Layout from './components/Layout/Layout';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Reels from './pages/Reels';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Messages from './pages/Messages';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

function AppContent() {
    // Global Bat Animation Initializer
    useBatAnimation();

    return (
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />

            {/* Main App Layout */}
            <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile/:id" element={<Profile />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/messages" element={<Messages />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <HashRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </HashRouter>
    );
}

export default App;
