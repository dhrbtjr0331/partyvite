import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;