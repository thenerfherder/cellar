import React, { useState, useMemo } from 'react';
import { WINE_PAIRINGS, getPairingsForWine } from '../data';
import { getDrinkabilityStatus, getWineKey, isSpecialBottle } from '../utils';
import { DRINKABILITY_STATUS } from '../constants';

const RedMeatIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 14C3.5 10 7 5.5 13 5.5C18.5 5.5 21 9 21 13C21 17 18 19.5 13 19.5C7 19.5 3.5 17 3.5 14Z"/>
    <path d="M21 10C22.5 8.5 22.5 6.5 21 5.5"/>
    <path d="M9 12C10.5 13.5 12.5 12.5 14.5 14"/>
  </svg>
);

const PoultryIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3.5C8 3.5 6 5 6 8.5C6 11.5 8.5 13.5 12 13.5C15.5 13.5 18 11.5 18 8.5C18 5.5 16 3.5 12 3.5C10 3.5 8 3.5 8 3.5Z"/>
    <path d="M10.5 13.5L10 21M13.5 13.5L14 21"/>
    <line x1="9" y1="21" x2="15" y2="21"/>
  </svg>
);

const FishIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12C2 12 5.5 8 11.5 8C16.5 8 19.5 10 19.5 12C19.5 14 16.5 16 11.5 16C5.5 16 2 12 2 12Z"/>
    <path d="M19.5 12L23 9M19.5 12L23 15"/>
    <circle cx="8" cy="11.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

const SeafoodIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.5C4 14.5 3.5 9.5 12 7C20.5 4.5 21.5 10 21 12.5C20.5 16 17.5 18.5 12 19C6.5 19.5 4 16.5 4 14.5Z"/>
    <path d="M12 19V8"/>
    <path d="M7 9C9 12 10.5 15.5 12 19"/>
    <path d="M17 8.5C15 11.5 13.5 15.5 12 19"/>
  </svg>
);

const PastaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14C3 14 5.5 8 12 8C18.5 8 21 14 21 14"/>
    <path d="M2 17H22"/>
    <path d="M4 17C4 17 4.5 21.5 12 21.5C19.5 21.5 20 17 20 17"/>
    <line x1="8" y1="8" x2="8" y2="5"/>
    <line x1="12" y1="8" x2="12" y2="4"/>
    <line x1="16" y1="8" x2="16" y2="5"/>
  </svg>
);

const CheeseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 19L12 4L22 19H2Z"/>
    <circle cx="10" cy="14" r="1.5"/>
    <circle cx="15.5" cy="16" r="1"/>
  </svg>
);

const VegetablesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="21" x2="12" y2="10"/>
    <path d="M12 10C12 10 7 9.5 6 5C9 4.5 12 7.5 12 10Z"/>
    <path d="M12 14C12 14 17.5 13.5 18.5 8.5C15 8 12 11 12 14Z"/>
    <path d="M12 10C12 10 8 7 10 3C12.5 4.5 12.5 8 12 10Z"/>
  </svg>
);

const DISH_CATEGORIES = [
  {
    id: 'red-meat',
    label: 'Red Meat',
    keywords: ['steak', 'beef', 'lamb', 'brisket', 'venison', 'ribs', 'short ribs', 'wild game', 'game', 'chorizo', 'chops'],
    Icon: RedMeatIcon,
    subCategories: [
      { id: 'steak', label: 'Steak', keywords: ['steak', 'beef'] },
      { id: 'lamb', label: 'Lamb', keywords: ['lamb', 'chops'] },
      { id: 'ribs', label: 'Ribs & Brisket', keywords: ['ribs', 'short ribs', 'brisket'] },
      { id: 'game', label: 'Game', keywords: ['venison', 'wild game', 'game'] },
      { id: 'chorizo', label: 'Chorizo', keywords: ['chorizo'] },
    ],
  },
  {
    id: 'poultry',
    label: 'Poultry',
    keywords: ['chicken', 'duck', 'turkey'],
    Icon: PoultryIcon,
    subCategories: [
      { id: 'chicken', label: 'Chicken', keywords: ['chicken'] },
      { id: 'duck', label: 'Duck', keywords: ['duck'] },
      { id: 'turkey', label: 'Turkey', keywords: ['turkey'] },
    ],
  },
  {
    id: 'fish',
    label: 'Fish',
    keywords: ['salmon', 'fish', 'trout'],
    Icon: FishIcon,
    subCategories: [
      { id: 'salmon', label: 'Salmon', keywords: ['salmon'] },
      { id: 'trout', label: 'Trout', keywords: ['trout'] },
      { id: 'white-fish', label: 'White Fish', keywords: ['fish'] },
    ],
  },
  {
    id: 'seafood',
    label: 'Seafood',
    keywords: ['oyster', 'caviar', 'sushi', 'shrimp', 'seafood', 'lobster', 'ceviche'],
    Icon: SeafoodIcon,
    subCategories: [
      { id: 'oysters', label: 'Oysters', keywords: ['oyster'] },
      { id: 'lobster', label: 'Lobster', keywords: ['lobster', 'seafood'] },
      { id: 'shrimp', label: 'Shrimp', keywords: ['shrimp'] },
      { id: 'sushi', label: 'Sushi', keywords: ['sushi', 'ceviche'] },
      { id: 'caviar', label: 'Caviar', keywords: ['caviar'] },
    ],
  },
  {
    id: 'pasta',
    label: 'Pasta & Pizza',
    keywords: ['pasta', 'pizza', 'risotto', 'bolognese', 'osso buco'],
    Icon: PastaIcon,
    subCategories: [
      { id: 'pasta', label: 'Pasta', keywords: ['pasta', 'bolognese', 'osso buco'] },
      { id: 'pizza', label: 'Pizza', keywords: ['pizza'] },
      { id: 'risotto', label: 'Risotto', keywords: ['risotto'] },
    ],
  },
  {
    id: 'cheese',
    label: 'Cheese',
    keywords: ['cheese', 'charcuterie'],
    Icon: CheeseIcon,
    subCategories: [
      { id: 'cheese', label: 'Cheese', keywords: ['cheese'] },
      { id: 'charcuterie', label: 'Charcuterie', keywords: ['charcuterie'] },
    ],
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    keywords: ['vegetable', 'ratatouille', 'salad', 'mediterranean', 'herb', 'roasted vegetables', 'mushroom'],
    Icon: VegetablesIcon,
    subCategories: [
      { id: 'salad', label: 'Salad', keywords: ['salad'] },
      { id: 'mushrooms', label: 'Mushrooms', keywords: ['mushroom'] },
      { id: 'roasted', label: 'Roasted Veg', keywords: ['roasted vegetables', 'vegetable', 'ratatouille'] },
      { id: 'mediterranean', label: 'Mediterranean', keywords: ['mediterranean', 'herb'] },
    ],
  },
];

const DRINKABILITY_BONUS = {
  [DRINKABILITY_STATUS.FINAL_YEAR]: 4,
  [DRINKABILITY_STATUS.READY_NOW]: 3,
  [DRINKABILITY_STATUS.AGE_1_5]: 1,
  [DRINKABILITY_STATUS.AGE_5_PLUS]: 0,
};

const STATUS_STYLES = {
  [DRINKABILITY_STATUS.FINAL_YEAR]: 'bg-red-50 text-red-600 border border-red-100',
  [DRINKABILITY_STATUS.READY_NOW]: 'bg-green-50 text-green-600 border border-green-100',
  [DRINKABILITY_STATUS.AGE_1_5]: 'bg-amber-50 text-amber-600 border border-amber-100',
  [DRINKABILITY_STATUS.AGE_5_PLUS]: 'bg-gray-50 text-gray-400 border border-gray-100',
};

function getRackPositions(wine, wines, racks) {
  const wineIdx = wines.findIndex(w => getWineKey(w) === getWineKey(wine));
  if (wineIdx === -1 || !racks?.length) return [];
  return racks.flatMap(rack =>
    Object.entries(rack.layout)
      .filter(([, occupant]) => occupant.wineIdx === wineIdx)
      .map(([pos]) => {
        const [row, col] = pos.split('-').map(Number);
        return { label: String.fromCharCode(65 + col) + (row + 1), rackName: rack.name };
      })
  ).sort((a, b) => a.rackName.localeCompare(b.rackName) || a.label.localeCompare(b.label));
}

export default function SommelierView({ wines, racks }) {
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [occasion, setOccasion] = useState('casual');

  const activeKeywords = selectedSub ? selectedSub.keywords : selectedDish?.keywords ?? [];

  const varietalScores = useMemo(() => {
    if (!selectedDish) return {};
    const scores = {};
    Object.entries(WINE_PAIRINGS).forEach(([varietal, pairings]) => {
      const matchCount = pairings.filter(food =>
        activeKeywords.some(kw => food.toLowerCase().includes(kw.toLowerCase()))
      ).length;
      if (matchCount > 0) scores[varietal] = matchCount;
    });
    return scores;
  }, [selectedDish, activeKeywords]);

  const recommendedVarietals = useMemo(() => Object.keys(varietalScores), [varietalScores]);

  const getMatchReasons = (wine) => {
    if (!selectedDish) return [];
    return getPairingsForWine(wine).filter(food =>
      activeKeywords.some(kw => food.toLowerCase().includes(kw.toLowerCase()))
    );
  };

  const compositeScore = (wine) => {
    const base = (varietalScores[wine.varietal] ?? 0) + DRINKABILITY_BONUS[getDrinkabilityStatus(wine)];
    return occasion === 'celebration' && isSpecialBottle(wine) ? base + 2 : base;
  };

  const recommendedBottles = useMemo(() => {
    if (!recommendedVarietals.length) return [];
    return wines
      .filter(w => recommendedVarietals.includes(w.varietal))
      .sort((a, b) => {
        const scoreDiff = compositeScore(b) - compositeScore(a);
        if (scoreDiff !== 0) return scoreDiff;
        return occasion === 'casual'
          ? a.estimatedPrice - b.estimatedPrice
          : b.estimatedPrice - a.estimatedPrice;
      });
  }, [wines, recommendedVarietals, varietalScores, occasion]);

  return (
    <div>
      {/* Occasion + Dish selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex rounded-lg overflow-hidden border border-gray-100">
          <button
            onClick={() => setOccasion('casual')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              occasion === 'casual'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-400 hover:text-gray-600'
            }`}
          >
            Casual
          </button>
          <button
            onClick={() => setOccasion('fancy')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              occasion === 'fancy'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-400 hover:text-gray-600'
            }`}
          >
            Fancy
          </button>
          <button
            onClick={() => setOccasion('celebration')}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
              occasion === 'celebration'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-400 hover:text-gray-600'
            }`}
          >
            Celebration
          </button>
        </div>
        <p className="text-xs text-gray-300 uppercase tracking-widest">
          {occasion === 'casual' ? 'Prioritising everyday bottles' : occasion === 'fancy' ? 'Prioritising special bottles' : 'Prioritising your finest bottles'}
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3 mb-4">
        {DISH_CATEGORIES.map(dish => {
          const isSelected = selectedDish?.id === dish.id;
          return (
            <button
              key={dish.id}
              onClick={() => {
                if (isSelected) {
                  setSelectedDish(null);
                  setSelectedSub(null);
                } else {
                  setSelectedDish(dish);
                  setSelectedSub(null);
                }
              }}
              className={`flex flex-col items-center gap-2.5 py-5 px-2 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600 hover:shadow-sm'
              }`}
            >
              <dish.Icon className="w-7 h-7" />
              <span className="text-xs font-bold uppercase tracking-wider leading-tight text-center">{dish.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-category filter */}
      {selectedDish && (
        <div className="flex flex-wrap gap-2 mb-8">
          {selectedDish.subCategories.map(sub => {
            const isActive = selectedSub?.id === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(isActive ? null : sub)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

      {!selectedDish ? (
        <div className="flex items-center justify-center py-24">
          <p className="text-gray-200 text-xs uppercase tracking-widest">Select a dish to get started</p>
        </div>
      ) : (
        <>
          {/* Target varietals */}
          {recommendedVarietals.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-widest text-gray-300 mb-3">Target Varietals</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(varietalScores)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([v]) => (
                    <span
                      key={v}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-gray-50 text-gray-600 rounded-full border border-gray-100"
                    >
                      {v}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Recommended bottles */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-gray-300">From Your Cellar</p>
              {recommendedBottles.length > 0 && (
                <span className="text-xs text-gray-300">{recommendedBottles.length} {recommendedBottles.length === 1 ? 'wine' : 'wines'}</span>
              )}
            </div>

            {recommendedBottles.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-gray-100 rounded-xl">
                <p className="text-gray-300 text-sm">No bottles in your cellar match this pairing</p>
              </div>
            ) : (() => {
              const [topPick, ...rest] = recommendedBottles;
              const multiRack = racks?.length > 1;

              const WineRow = ({ wine, index }) => {
                const status = getDrinkabilityStatus(wine);
                const special = isSpecialBottle(wine);
                const positions = getRackPositions(wine, wines, racks);
                const matchReasons = getMatchReasons(wine);
                return (
                  <div className={`flex items-center gap-5 py-4 border-b border-gray-50 ${special ? 'bg-blue-50/20' : ''}`}>
                    <div className="w-8 shrink-0 text-right">
                      <span className="text-xl font-black tabular-nums" style={{ color: '#e8e8e8' }}>{index}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-black text-gray-900 text-sm">{wine.producer}</span>
                        <span className="text-gray-300 text-xs">/</span>
                        <span className="text-gray-700 text-sm font-semibold">{wine.name}</span>
                        {wine.vintage && <span className="text-gray-400 text-sm">{wine.vintage}</span>}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-xs text-gray-400">{wine.varietal}</span>
                        {wine.state && (
                          <>
                            <span className="text-gray-200">·</span>
                            <span className="text-xs text-gray-400">{wine.state}, {wine.country}</span>
                          </>
                        )}
                        {matchReasons.length > 0 && (
                          <>
                            <span className="text-gray-200">·</span>
                            <span className="text-xs text-gray-300">good with {matchReasons.slice(0, 2).map(r => r.toLowerCase()).join(', ')}</span>
                          </>
                        )}
                      </div>
                      {positions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {positions.map(({ label, rackName }, j) => (
                            <span key={j} title={rackName} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-bold rounded font-mono border border-amber-100">
                              {multiRack ? `${rackName} ${label}` : label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      {wine.quantity > 1 && <span className="text-xs text-gray-400 font-semibold tabular-nums">×{wine.quantity}</span>}
                      <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${STATUS_STYLES[status]}`}>{status}</span>
                    </div>
                  </div>
                );
              };

              const topStatus = getDrinkabilityStatus(topPick);
              const topPositions = getRackPositions(topPick, wines, racks);
              const topMatchReasons = getMatchReasons(topPick);

              return (
                <div>
                  {/* Top pick card */}
                  <div className={`mb-6 p-5 rounded-xl border ${isSpecialBottle(topPick) ? 'border-blue-100 bg-blue-50/30' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-xs font-black uppercase tracking-widest text-amber-500 pt-0.5">Pick</span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        {topPick.quantity > 1 && <span className="text-xs text-gray-400 font-semibold tabular-nums">×{topPick.quantity}</span>}
                        <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${STATUS_STYLES[topStatus]}`}>{topStatus}</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap mb-1">
                      <span className="font-black text-gray-900">{topPick.producer}</span>
                      <span className="text-gray-300 text-xs">/</span>
                      <span className="text-gray-700 font-semibold">{topPick.name}</span>
                      {topPick.vintage && <span className="text-gray-400">{topPick.vintage}</span>}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-gray-400">{topPick.varietal}</span>
                      {topPick.state && (
                        <>
                          <span className="text-gray-200">·</span>
                          <span className="text-xs text-gray-400">{topPick.state}, {topPick.country}</span>
                        </>
                      )}
                      {topMatchReasons.length > 0 && (
                        <>
                          <span className="text-gray-200">·</span>
                          <span className="text-xs text-gray-400">good with {topMatchReasons.slice(0, 2).map(r => r.toLowerCase()).join(', ')}</span>
                        </>
                      )}
                    </div>
                    {topPositions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {topPositions.map(({ label, rackName }, j) => (
                          <span key={j} title={rackName} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-bold rounded font-mono border border-amber-100">
                            {multiRack ? `${rackName} ${label}` : label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rest of list */}
                  {rest.length > 0 && (
                    <div>
                      {rest.map((wine, i) => (
                        <WineRow key={getWineKey(wine)} wine={wine} index={i + 2} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
}
