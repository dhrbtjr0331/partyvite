import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import partyService from '../services/partyService';
import PartyForm from '../components/party/PartyForm';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EditPartyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParty();
  }, [id]);

  const fetchParty = async () => {
    try {
      setLoading(true);
      const data = await partyService.getPartyById(id);
      setParty(data);
    } catch (err) {
      setError('Failed to load party');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      setError('');
      await partyService.updateParty(id, formData);
      navigate(`/parties/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update party');
    } finally {
      setSubmitLoading(false);
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Party ✏️</h1>
          <p className="text-gray-600 mt-2">
            Update your party details
          </p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <PartyForm
            initialData={party}
            onSubmit={handleSubmit}
            submitLabel="Update Party"
            loading={submitLoading}
          />
        </Card>
      </div>
    </div>
  );
};

export default EditPartyPage;