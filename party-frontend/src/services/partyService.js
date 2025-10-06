import api from './api';

const partyService = {
  // Get all public parties
  getAllParties: async () => {
    const response = await api.get('/parties');
    return response.data;
  },

  // Get party by ID
  getPartyById: async (partyId) => {
    const response = await api.get(`/parties/${partyId}`);
    return response.data;
  },

  // Get my hosted parties
  getMyParties: async () => {
    const response = await api.get('/parties/my-parties');
    return response.data;
  },

  // Create new party
  createParty: async (partyData) => {
    const response = await api.post('/parties', partyData);
    return response.data;
  },

  // Update party
  updateParty: async (partyId, partyData) => {
    const response = await api.put(`/parties/${partyId}`, partyData);
    return response.data;
  },

  // Delete party
  deleteParty: async (partyId) => {
    const response = await api.delete(`/parties/${partyId}`);
    return response.data;
  },
};

export default partyService;