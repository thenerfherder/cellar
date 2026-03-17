import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [threshold, setThreshold] = useState(settings.specialBottleThreshold);

  useEffect(() => {
    setThreshold(settings.specialBottleThreshold);
  }, [settings.specialBottleThreshold, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const value = parseFloat(threshold);
    if (!isNaN(value) && value >= 0) {
      onSave({ specialBottleThreshold: value });
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-black text-gray-900 uppercase tracking-wider mb-1">
              Special Bottle Threshold
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Bottles priced above this amount are highlighted as "Special" throughout the app.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">$</span>
              <input
                type="number"
                min="0"
                step="1"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:border-gray-400"
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
