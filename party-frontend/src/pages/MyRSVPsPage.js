import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import rsvpService from '../services/rsvpService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyRSVPsPage = () => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRSVPs();
  }, []);

  const fetchMyRSVPs = async () => {
    try {
      setLoading(true);
      const data = await rsvpService.getMyRSVPs();
      setRsvps(data);
    } catch (err) {
      setError('Failed to load your RSVPs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRSVP = async (partyId) => {
    if (window.confirm('Are you sure you want to cancel this RSVP?')) {
      try {
        await rsvpService.cancelRSVP(partyId);
        await fetchMyRSVPs();
      } catch (err) {
        alert('Failed to cancel RSVP');
      }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My RSVPs 🎟️</h1>
          <p className="text-gray-600 mt-2">
            Parties you're attending
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {rsvps.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No RSVPs yet
            </h3>
            <p className="text-gray-600 mb-6">
              Browse parties and RSVP to events you want to attend!
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Browse Parties
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {rsvps.map((rsvp) => (
              <Card key={rsvp.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {rsvp.partyTitle}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>RSVP'd on {format(new Date(rsvp.rsvpDate), 'PPP')}</p>
                      <p className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          rsvp.status === 'GOING' ? 'bg-green-500' :
                          rsvp.status === 'MAYBE' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`}></span>
                        Status: {rsvp.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/parties/${rsvp.partyId}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleCancelRSVP(rsvp.partyId)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRSVPsPage;