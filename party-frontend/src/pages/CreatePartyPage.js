import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import partyService from '../services/partyService';
import PartyForm from '../components/party/PartyForm';
import Card from '../components/common/Card';

const CreatePartyPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      const newParty = await partyService.createParty(formData);
      navigate(`/parties/${newParty.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create party');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create a Party 🎊</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to create your party
          </p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <PartyForm
            onSubmit={handleSubmit}
            submitLabel="Create Party"
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
};

export default CreatePartyPage;