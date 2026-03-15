import React from 'react';

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-bold">{label}</p>
    <p className="text-3xl font-black text-gray-900">{value}</p>
  </div>
);

export default StatCard;
