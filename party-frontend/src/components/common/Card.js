import React from 'react';

const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;