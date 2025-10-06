import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-indigo-200 transition">
            Partyvite
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-indigo-200 transition px-3 py-2 rounded-md"
                >
                  Browse Parties
                </Link>
                <Link
                  to="/my-parties"
                  className="hover:text-indigo-200 transition px-3 py-2 rounded-md"
                >
                  My Parties
                </Link>
                <Link
                  to="/my-rsvps"
                  className="hover:text-indigo-200 transition px-3 py-2 rounded-md"
                >
                  My RSVPs
                </Link>
                <Link
                  to="/create-party"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md font-medium transition"
                >
                  Create Party
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm">Hi, {user?.username}!</span>
                  <Button variant="secondary" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-200 transition px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md font-medium transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;