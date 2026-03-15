import React from 'react';

const DetailModal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-start justify-center p-4 py-8">
        <div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-3 flex justify-between items-center z-10 rounded-t-lg">
            <div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{title}</h2>
              <p className="text-gray-500 text-xs uppercase tracking-widest">{subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
            >
              ×
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
