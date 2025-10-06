import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Card from '../common/Card';

const PartyCard = ({ party }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/parties/${party.id}`);
  };

  return (
    <Card className="p-6 cursor-pointer" onClick={handleClick}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900">{party.title}</h3>
        {party.atCapacity && (
          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
            Full
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{party.description}</p>

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center">
          <span className="mr-2">📅</span>
          <span>{format(new Date(party.partyDateTime), 'PPP p')}</span>
        </div>

        <div className="flex items-center">
          <span className="mr-2">📍</span>
          <span>{party.location}</span>
        </div>

        <div className="flex items-center">
          <span className="mr-2">👤</span>
          <span>Hosted by {party.hostUsername}</span>
        </div>

        <div className="flex items-center">
          <span className="mr-2">👥</span>
          <span>
            {party.rsvpCount} {party.rsvpCount === 1 ? 'person' : 'people'} going
            {party.capacity && ` (${party.capacity} max)`}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-indigo-600 hover:text-indigo-500 font-medium text-sm">
          View Details →
        </button>
      </div>
    </Card>
  );
};

export default PartyCard;