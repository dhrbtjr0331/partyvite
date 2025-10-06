import api from './api';

const rsvpService = {
  // Create or update RSVP
  createRSVP: async (rsvpData) => {
    const response = await api.post('/rsvps', rsvpData);
    return response.data;
  },

  // Get my RSVPs
  getMyRSVPs: async () => {
    const response = await api.get('/rsvps/my-rsvps');
    return response.data;
  },

  // Get RSVPs for a party
  getPartyRSVPs: async (partyId) => {
    const response = await api.get(`/rsvps/party/${partyId}`);
    return response.data;
  },

  // Get my RSVP for a specific party
  getMyRSVPForParty: async (partyId) => {
    const response = await api.get(`/rsvps/party/${partyId}/me`);
    return response.data;
  },

  // Cancel RSVP
  cancelRSVP: async (partyId) => {
    const response = await api.delete(`/rsvps/party/${partyId}`);
    return response.data;
  },
};

export default rsvpService;