import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-extrabold mb-6">
            Welcome to Partyvite
          </h1>
          <p className="text-2xl mb-8 text-indigo-100">
            Discover, create, and join amazing parties in your college community
          </p>
          <p className="text-lg mb-12 text-indigo-100 max-w-2xl mx-auto">
            Never miss out on the best events. Connect with friends, make new ones,
            and create unforgettable memories.
          </p>

          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="text-lg px-8 py-4">
                  Browse Parties
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button className="text-lg px-8 py-4">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="text-lg px-8 py-4 bg-white text-indigo-600 hover:bg-indigo-50">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Discover Parties</h3>
              <p className="text-indigo-100">
                Browse upcoming parties and events in your area
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl mb-4">🎊</div>
              <h3 className="text-xl font-bold mb-2">Host Events</h3>
              <p className="text-indigo-100">
                Create and manage your own parties with ease
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-indigo-100">
                RSVP to events and see who else is going
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;