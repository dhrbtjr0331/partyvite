import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import partyService from '../services/partyService';
import PartyCard from '../components/party/PartyCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';

const MyPartiesPage = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyParties();
  }, []);

  const fetchMyParties = async () => {
    try {
      setLoading(true);
      const data = await partyService.getMyParties();
      setParties(data);
    } catch (err) {
      setError('Failed to load your parties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Parties 🎉</h1>
            <p className="text-gray-600 mt-2">
              Parties you're hosting
            </p>
          </div>
          <Link to="/create-party">
            <Button>Create New Party</Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {parties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              You haven't hosted any parties yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first party and invite your friends!
            </p>
            <Link to="/create-party">
              <Button>Create Your First Party</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parties.map((party) => (
              <PartyCard key={party.id} party={party} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPartiesPage;