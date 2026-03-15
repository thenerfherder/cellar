import React from 'react';
import { isSpecialBottle } from '../utils';

const WineCard = ({ wine, showDrinkWindow = false, onClick }) => {
  const isSpecial = isSpecialBottle(wine);

  return (
    <div
      className={`rounded-lg p-4 transition-colors cursor-pointer ${
        isSpecial
          ? 'bg-blue-50 border-2 border-blue-300 hover:bg-blue-100'
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
      onClick={() => onClick?.(wine)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-black text-gray-900">{wine.producer}</div>
            {isSpecial && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                Special
              </span>
            )}
          </div>
          <div className="text-gray-700 font-semibold">{wine.name}</div>
          <div className="text-sm text-gray-600 mt-1">
            {wine.vintage || 'NV'} • {wine.varietal} • {wine.state}, {wine.country}
          </div>
          {showDrinkWindow && (
            <div className="text-sm text-gray-500 mt-1">
              Drink Window: {wine.drinkWindow}
            </div>
          )}
        </div>
        <div className="text-right ml-4">
          <div className="text-2xl font-black text-gray-900">{wine.quantity}</div>
          <div className="text-xs text-gray-500">bottles</div>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
