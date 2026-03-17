import React from 'react';
import WineCard from './WineCard';
import { getWineKey } from '../utils';

const WineList = ({ wines, showDrinkWindow = false, onWineClick }) => (
  <div>
    <h3 className="text-xl font-black text-gray-900 mb-4 uppercase">Bottles in Collection</h3>
    <div className="space-y-3">
      {wines.map((wine, idx) => (
        <WineCard key={getWineKey(wine)} wine={wine} showDrinkWindow={showDrinkWindow} onClick={onWineClick} />
      ))}
    </div>
  </div>
);

export default WineList;
