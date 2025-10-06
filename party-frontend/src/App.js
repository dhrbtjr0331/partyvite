import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreatePartyPage from './pages/CreatePartyPage';
import EditPartyPage from './pages/EditPartyPage';
import PartyDetailsPage from './pages/PartyDetailsPage';
import MyPartiesPage from './pages/MyPartiesPage';
import MyRSVPsPage from './pages/MyRSVPsPage';
import LoadingSpinner from './components/common/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-party"
            element={
              <ProtectedRoute>
                <CreatePartyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parties/:id"
            element={
              <ProtectedRoute>
                <PartyDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parties/:id/edit"
            element={
              <ProtectedRoute>
                <EditPartyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-parties"
            element={
              <ProtectedRoute>
                <MyPartiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-rsvps"
            element={
              <ProtectedRoute>
                <MyRSVPsPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;