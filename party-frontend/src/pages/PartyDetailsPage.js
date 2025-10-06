import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import partyService from '../services/partyService';
import rsvpService from '../services/rsvpService';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PartyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [party, setParty] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [myRsvp, setMyRsvp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPartyDetails();
  }, [id]);

  const fetchPartyDetails = async () => {
    try {
      setLoading(true);
      const [partyData, rsvpData, myRsvpData] = await Promise.all([
        partyService.getPartyById(id),
        rsvpService.getPartyRSVPs(id),
        rsvpService.getMyRSVPForParty(id).catch(() => null),
      ]);

      setParty(partyData);
      setRsvps(rsvpData);
      setMyRsvp(myRsvpData);
    } catch (err) {
      setError('Failed to load party details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async () => {
    try {
      setRsvpLoading(true);
      await rsvpService.createRSVP({
        partyId: parseInt(id),
        status: 'GOING',
      });
      await fetchPartyDetails();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to RSVP');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleCancelRSVP = async () => {
    try {
      setRsvpLoading(true);
      await rsvpService.cancelRSVP(id);
      await fetchPartyDetails();
    } catch (err) {
      alert('Failed to cancel RSVP');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this party?')) {
      try {
        await partyService.deleteParty(id);
        navigate('/my-parties');
      } catch (err) {
        alert('Failed to delete party');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/parties/${id}/edit`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !party) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Party Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This party does not exist'}</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const isHost = user?.id === party.hostId;
  const hasRSVP = myRsvp && myRsvp.status !== 'CANCELLED';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Party Header */}
        <Card className="p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {party.title}
              </h1>
              <p className="text-gray-600">
                Hosted by <span className="font-semibold">{party.hostUsername}</span>
              </p>
            </div>
            {party.atCapacity && (
              <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded">
                At Capacity
              </span>
            )}
          </div>

          {/* Party Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">📝</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
                <p className="text-gray-600">{party.description || 'No description provided'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-2xl mr-3">📅</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                <p className="text-gray-600">
                  {format(new Date(party.partyDateTime), 'PPPP')}
                  <br />
                  {format(new Date(party.partyDateTime), 'p')}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-2xl mr-3">📍</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">{party.location}</p>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-2xl mr-3">👥</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Attendance</h3>
                <p className="text-gray-600">
                  {party.rsvpCount} {party.rsvpCount === 1 ? 'person' : 'people'} going
                  {party.capacity && ` (${party.capacity} max capacity)`}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {isHost ? (
              <>
                <Button onClick={handleEdit} className="flex-1">
                  Edit Party
                </Button>
                <Button variant="danger" onClick={handleDelete} className="flex-1">
                  Delete Party
                </Button>
              </>
            ) : (
              <>
                {hasRSVP ? (
                  <Button
                    variant="danger"
                    onClick={handleCancelRSVP}
                    disabled={rsvpLoading}
                    fullWidth
                  >
                    {rsvpLoading ? 'Cancelling...' : 'Cancel RSVP'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleRSVP}
                    disabled={rsvpLoading || party.atCapacity}
                    fullWidth
                  >
                    {rsvpLoading ? 'RSVPing...' : party.atCapacity ? 'Party Full' : 'RSVP'}
                  </Button>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Guest List */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Guest List ({rsvps.filter(r => r.status === 'GOING').length})
          </h2>

          {rsvps.filter(r => r.status === 'GOING').length === 0 ? (
            <p className="text-gray-600">No one has RSVP'd yet. Be the first!</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {rsvps
                .filter((rsvp) => rsvp.status === 'GOING')
                .map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3"
                  >
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {rsvp.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-900 font-medium">{rsvp.username}</span>
                  </div>
                ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PartyDetailsPage;