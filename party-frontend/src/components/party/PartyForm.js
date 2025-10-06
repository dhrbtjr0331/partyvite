import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const PartyForm = ({ initialData, onSubmit, submitLabel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    partyDateTime: '',
    capacity: '',
    isPublic: true,
  });

  useEffect(() => {
    if (initialData) {
      // Format datetime for input field
      const formattedDateTime = initialData.partyDateTime
        ? new Date(initialData.partyDateTime).toISOString().slice(0, 16)
        : '';

      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        location: initialData.location || '',
        partyDateTime: formattedDateTime,
        capacity: initialData.capacity || '',
        isPublic: initialData.isPublic !== undefined ? initialData.isPublic : true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format data for backend
    const submitData = {
      ...formData,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
      partyDateTime: new Date(formData.partyDateTime).toISOString(),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Party Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g., Friday Night House Party"
        required
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell people what to expect..."
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <Input
        label="Location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g., 123 Main St, Apt 4B"
        required
      />

      <Input
        label="Date & Time"
        type="datetime-local"
        name="partyDateTime"
        value={formData.partyDateTime}
        onChange={handleChange}
        required
      />

      <Input
        label="Capacity (Optional)"
        type="number"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="Maximum number of guests"
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
          Make this party public (visible to everyone)
        </label>
      </div>

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
};

export default PartyForm;