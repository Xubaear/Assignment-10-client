import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="animate-pulse p-4 bg-white rounded-lg shadow">
      <div className="h-40 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
};

export default SkeletonCard;
