import React, { useState, useMemo } from 'react';
import { WINE_PAIRINGS, VARIETAL_PAIRING_SCORES, REGION_SCORE_MODIFIERS, SUBREGION_SCORE_MODIFIERS, ROBUST_PAIRING_KEYS, DELICATE_PAIRING_KEYS, PREPARATION_MODIFIERS, getPairingsForWine } from '../data';
import { getDrinkabilityStatus, getWineKey, isSpecialBottle } from '../utils';
import { DRINKABILITY_STATUS, CONFIG, PAIRING_KEYS } from '../constants';

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

const PorkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 14.5C5 11 8.5 8.5 13 8.5C17 8.5 20 11 20 14C20 17 17 19 13 19C9 19 5 17 5 14.5Z"/>
    <path d="M20.5 11C22 9.5 22 7.5 20.5 7C19.5 8 20 10 20.5 11Z"/>
    <path d="M9.5 8.5C9 7 9.5 5.5 11 5.5C11.5 7 11 8.5 9.5 8.5Z"/>
    <ellipse cx="17" cy="13.5" rx="1.5" ry="1"/>
    <circle cx="16.4" cy="13.5" r="0.35" fill="currentColor" stroke="none"/>
    <circle cx="17.6" cy="13.5" r="0.35" fill="currentColor" stroke="none"/>
  </svg>
);

const SpicyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3C12 3 10 6 10 9C10 11.5 12.5 13 12.5 16C12.5 18.5 11 21 11 21"/>
    <path d="M16 5C16 5 14.5 7.5 15 10C15.5 12 17.5 13 17.5 15.5C17.5 18 16 20 16 20"/>
    <path d="M8 6C8 6 6.5 8.5 7 11C7.5 13 9.5 14 9.5 16.5C9.5 19 8 21 8 21"/>
  </svg>
);

const BrunchIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 3H15.5L14 11C14 13 13 14.5 12 14.5C11 14.5 10 13 10 11L8.5 3Z"/>
    <circle cx="11" cy="6" r="0.4" fill="currentColor" stroke="none"/>
    <circle cx="13" cy="8" r="0.4" fill="currentColor" stroke="none"/>
    <circle cx="11.5" cy="10" r="0.4" fill="currentColor" stroke="none"/>
    <line x1="12" y1="14.5" x2="12" y2="20"/>
    <line x1="8" y1="20" x2="16" y2="20"/>
  </svg>
);

const DessertIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15C4 12.5 7.5 10.5 12 10.5C16.5 10.5 20 12.5 20 15"/>
    <path d="M3 15H21"/>
    <path d="M5 15C5 15 5.5 20 12 20C18.5 20 19 15 19 15"/>
    <path d="M12 10.5V7"/>
    <path d="M9 7C9 7 9 4.5 12 4C15 4.5 15 7 15 7H9Z"/>
  </svg>
);

const DISH_CATEGORIES = [
  {
    id: PAIRING_KEYS.RED_MEAT,
    label: 'Red Meat',
    keywords: ['steak', 'beef', 'lamb', 'brisket', 'venison', 'ribs', 'short ribs', 'wild game', 'game', 'chorizo', 'chops'],
    Icon: RedMeatIcon,
    subCategories: [
      { id: PAIRING_KEYS.STEAK, label: 'Steak', keywords: ['steak', 'beef'] },
      { id: PAIRING_KEYS.LAMB, label: 'Lamb', keywords: ['lamb', 'chops'] },
      { id: PAIRING_KEYS.RIBS, label: 'Ribs & Brisket', keywords: ['ribs', 'short ribs', 'brisket'] },
      { id: PAIRING_KEYS.GAME, label: 'Game', keywords: ['venison', 'wild game', 'game'] },
      { id: PAIRING_KEYS.CHORIZO, label: 'Chorizo', keywords: ['chorizo'] },
    ],
  },
  {
    id: PAIRING_KEYS.POULTRY,
    label: 'Poultry',
    keywords: ['chicken', 'duck', 'turkey'],
    Icon: PoultryIcon,
    subCategories: [
      { id: PAIRING_KEYS.CHICKEN, label: 'Chicken', keywords: ['chicken'] },
      { id: PAIRING_KEYS.DUCK, label: 'Duck', keywords: ['duck'] },
      { id: PAIRING_KEYS.TURKEY, label: 'Turkey', keywords: ['turkey'] },
    ],
  },
  {
    id: PAIRING_KEYS.PORK,
    label: 'Pork',
    keywords: ['pork', 'tenderloin', 'prosciutto', 'ham', 'pancetta', 'belly'],
    Icon: PorkIcon,
    subCategories: [
      { id: PAIRING_KEYS.PORK_CHOPS, label: 'Chops', keywords: ['pork', 'tenderloin', 'pork chop'] },
      { id: PAIRING_KEYS.PORK_BELLY, label: 'Belly', keywords: ['belly', 'pork belly'] },
      { id: PAIRING_KEYS.HAM, label: 'Ham & Cured', keywords: ['ham', 'prosciutto', 'pancetta', 'cured'] },
    ],
  },
  {
    id: PAIRING_KEYS.FISH,
    label: 'Fish',
    keywords: ['salmon', 'fish', 'trout'],
    Icon: FishIcon,
    subCategories: [
      { id: PAIRING_KEYS.SALMON, label: 'Salmon', keywords: ['salmon'] },
      { id: PAIRING_KEYS.TROUT, label: 'Trout', keywords: ['trout'] },
      { id: PAIRING_KEYS.WHITE_FISH, label: 'White Fish', keywords: ['fish'] },
    ],
  },
  {
    id: PAIRING_KEYS.SEAFOOD,
    label: 'Seafood',
    keywords: ['oyster', 'caviar', 'sushi', 'shrimp', 'seafood', 'lobster', 'ceviche'],
    Icon: SeafoodIcon,
    subCategories: [
      { id: PAIRING_KEYS.OYSTERS, label: 'Oysters', keywords: ['oyster'] },
      { id: PAIRING_KEYS.LOBSTER, label: 'Lobster', keywords: ['lobster', 'seafood'] },
      { id: PAIRING_KEYS.SHRIMP, label: 'Shrimp', keywords: ['shrimp'] },
      { id: PAIRING_KEYS.SUSHI, label: 'Sushi', keywords: ['sushi', 'ceviche'] },
      { id: PAIRING_KEYS.CAVIAR, label: 'Caviar', keywords: ['caviar'] },
    ],
  },
  {
    id: PAIRING_KEYS.PASTA,
    label: 'Pasta & Pizza',
    keywords: ['pasta', 'pizza', 'risotto', 'bolognese', 'osso buco'],
    Icon: PastaIcon,
    subCategories: [
      { id: PAIRING_KEYS.PASTA, label: 'Pasta', keywords: ['pasta', 'bolognese', 'osso buco'], scoreKey: PAIRING_KEYS.PASTA_SUB },
      { id: PAIRING_KEYS.PIZZA, label: 'Pizza', keywords: ['pizza'] },
      { id: PAIRING_KEYS.RISOTTO, label: 'Risotto', keywords: ['risotto'] },
    ],
  },
  {
    id: PAIRING_KEYS.CHEESE,
    label: 'Cheese',
    keywords: ['cheese', 'charcuterie'],
    Icon: CheeseIcon,
    subCategories: [
      { id: PAIRING_KEYS.CHEESE, label: 'Cheese', keywords: ['cheese'], scoreKey: PAIRING_KEYS.CHEESE_SUB },
      { id: PAIRING_KEYS.CHARCUTERIE, label: 'Charcuterie', keywords: ['charcuterie'] },
    ],
  },
  {
    id: PAIRING_KEYS.VEGETABLES,
    label: 'Vegetables',
    keywords: ['vegetable', 'ratatouille', 'salad', 'mediterranean', 'herb', 'roasted vegetables', 'mushroom'],
    Icon: VegetablesIcon,
    subCategories: [
      { id: PAIRING_KEYS.SALAD, label: 'Salad', keywords: ['salad'] },
      { id: PAIRING_KEYS.MUSHROOMS, label: 'Mushrooms', keywords: ['mushroom'] },
      { id: PAIRING_KEYS.ROASTED, label: 'Roasted Veg', keywords: ['roasted vegetables', 'vegetable', 'ratatouille'] },
      { id: PAIRING_KEYS.MEDITERRANEAN, label: 'Mediterranean', keywords: ['mediterranean', 'herb'] },
    ],
  },
  {
    id: PAIRING_KEYS.SPICY,
    label: 'Spicy',
    keywords: ['spicy', 'thai', 'indian', 'chinese', 'curry', 'chili', 'szechuan'],
    Icon: SpicyIcon,
    subCategories: [
      { id: PAIRING_KEYS.THAI, label: 'Thai', keywords: ['thai', 'curry', 'lemongrass'] },
      { id: PAIRING_KEYS.INDIAN, label: 'Indian', keywords: ['indian', 'curry', 'chili'] },
      { id: PAIRING_KEYS.CHINESE, label: 'Chinese', keywords: ['chinese', 'szechuan', 'dim sum'] },
    ],
  },
  {
    id: PAIRING_KEYS.BRUNCH,
    label: 'Brunch',
    keywords: ['eggs', 'smoked salmon', 'brunch', 'benedict', 'omelette'],
    Icon: BrunchIcon,
    subCategories: [
      { id: PAIRING_KEYS.EGGS, label: 'Eggs', keywords: ['eggs', 'omelette', 'frittata', 'benedict'] },
      { id: PAIRING_KEYS.SMOKED_SALMON, label: 'Smoked Salmon', keywords: ['smoked salmon', 'lox'] },
    ],
  },
  {
    id: PAIRING_KEYS.DESSERT,
    label: 'Dessert',
    keywords: ['dessert', 'chocolate', 'fruit', 'tart', 'cake'],
    Icon: DessertIcon,
    subCategories: [
      { id: PAIRING_KEYS.FRUIT_DESSERT, label: 'Fruit & Tarts', keywords: ['fruit', 'tart', 'fruit dessert', 'cake'] },
      { id: PAIRING_KEYS.CHOCOLATE, label: 'Chocolate', keywords: ['chocolate', 'dark chocolate'] },
    ],
  },
];

// Continuous peak proximity bonus (0–4) based on where the wine sits in its arc.
// Replaces the old 4-tier step-function so wines near their peak rank above
// wines at the edge of their window, and past-peak wines decay gracefully
// instead of returning null and disappearing from results.
function getPeakProximityBonus(wine) {
  if (!wine.drinkWindow) return 0;
  const [start, end] = wine.drinkWindow.split('-').map(Number);
  const { CURRENT_YEAR } = CONFIG;
  if (CURRENT_YEAR > end) return Math.max(0, 2 - (CURRENT_YEAR - end)); // past peak, fades over 2 years
  if (CURRENT_YEAR === end) return 4;                                    // final year: urgency
  if (CURRENT_YEAR < start) return start - CURRENT_YEAR <= 3 ? 1 : 0;  // approaching window
  // In window: score by proximity to midpoint (peak)
  const peak = (start + end) / 2;
  const halfWindow = (end - start) / 2;
  const proximity = 1 - Math.abs(CURRENT_YEAR - peak) / halfWindow;     // 1 at peak, 0 at edge
  return Math.round(1 + proximity * 3);                                  // range 1–4
}

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

function WineRow({ wine, index, varietalScores, wines, racks, getMatchReasons, scoreBreakdown, preparation, multiRack }) {
  const status = getDrinkabilityStatus(wine);
  const special = isSpecialBottle(wine);
  const isPerfectPairing = (varietalScores[wine.varietal] ?? 0) === 5;
  const positions = getRackPositions(wine, wines, racks);
  const matchReasons = getMatchReasons(wine);
  return (
    <div className={`flex items-center gap-5 py-4 border-b border-gray-50 ${isPerfectPairing ? 'bg-blue-50/40' : special ? 'bg-blue-50/20' : ''}`}>
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
        <ScoreTag breakdown={scoreBreakdown(wine)} preparation={preparation} />
        {status && <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${STATUS_STYLES[status]}`}>{status}</span>}
      </div>
    </div>
  );
}

function ScoreTag({ breakdown, preparation }) {
  const { pairing, region, peak, tannin, prep, rating, occasion } = breakdown;
  const total = pairing + region + peak + tannin + prep + rating + occasion;
  const rows = [
    { label: 'Pairing fit', value: pairing },
    { label: 'Peak proximity', value: peak },
    region   !== 0 && { label: 'Region', value: region },
    tannin   !== 0 && { label: 'Tannin', value: tannin },
    prep     !== 0 && { label: preparation === 'light' ? 'Light prep' : 'Rich prep', value: prep },
    rating   !== 0 && { label: 'Your rating', value: rating },
    occasion !== 0 && { label: 'Occasion', value: occasion },
  ].filter(Boolean);
  return (
    <div className="relative group/score flex items-center">
      <span className="text-xs text-gray-300 tabular-nums font-mono cursor-default select-none">{total}</span>
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover/score:block z-10 pointer-events-none">
        <div className="bg-gray-900 text-white rounded-lg shadow-xl p-3 w-44">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Score breakdown</p>
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-3 py-0.5">
              <span className="text-xs text-gray-300">{label}</span>
              <span className={`text-xs font-bold tabular-nums ${value > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {value > 0 ? '+' : ''}{value}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-700 mt-2 pt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">Total</span>
            <span className="text-xs font-black text-white tabular-nums">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SommelierView({ wines, racks, getRatingInfo }) {
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [occasion, setOccasion] = useState('casual');
  const [preparation, setPreparation] = useState(null); // null | 'light' | 'rich'

  const activeKeywords = useMemo(
    () => selectedSub ? selectedSub.keywords : selectedDish?.keywords ?? [],
    [selectedSub, selectedDish]
  );
  const activeKey = selectedSub ? (selectedSub.scoreKey ?? selectedSub.id) : selectedDish?.id;

  const varietalScores = useMemo(() => {
    if (!selectedDish || !activeKey) return {};
    const scores = {};
    // Primary: explicit score table
    Object.entries(VARIETAL_PAIRING_SCORES).forEach(([varietal, categoryScores]) => {
      const score = categoryScores[activeKey] ?? 0;
      if (score > 0) scores[varietal] = score;
    });
    // Fallback: text-match for custom varietals not covered by the score table.
    // Capped at 2 (acceptable) so they never outrank curated entries.
    wines.forEach(wine => {
      if (wine.varietal in VARIETAL_PAIRING_SCORES) return;
      if (wine.varietal in scores) return;
      const pairings = WINE_PAIRINGS[wine.varietal];
      if (!pairings) return;
      const matchCount = pairings.filter(food =>
        activeKeywords.some(kw => food.toLowerCase().includes(kw.toLowerCase()))
      ).length;
      if (matchCount > 0) scores[wine.varietal] = Math.min(2, matchCount);
    });
    return scores;
  }, [selectedDish, activeKey, wines, activeKeywords]);

  const recommendedVarietals = useMemo(() => Object.keys(varietalScores), [varietalScores]);

  const getMatchReasons = (wine) => {
    if (!selectedDish) return [];
    const scoreData = VARIETAL_PAIRING_SCORES[wine.varietal];
    if (scoreData) {
      // When a sub-category is selected, surface it specifically — don't let
      // other high-scoring subs push it off the label (e.g. Caviar selected
      // shouldn't show "good with oysters, shrimp").
      if (selectedSub) {
        const key = selectedSub.scoreKey ?? selectedSub.id;
        return (scoreData[key] ?? 0) >= 3 ? [selectedSub.label.toLowerCase()] : [];
      }
      // No sub selected: show all sub-categories that score well for this dish.
      const subMatches = selectedDish.subCategories
        .filter(sub => (scoreData[sub.scoreKey ?? sub.id] ?? 0) >= 3)
        .map(sub => sub.label.toLowerCase());
      if (subMatches.length > 0) return subMatches;
      return (scoreData[selectedDish.id] ?? 0) >= 3 ? [selectedDish.label.toLowerCase()] : [];
    }
    // Unknown varietal: fall back to legacy text match
    return getPairingsForWine(wine).filter(food =>
      activeKeywords.some(kw => food.toLowerCase().includes(kw.toLowerCase()))
    );
  };

  const scoreBreakdown = (wine) => {
    const pairing = (varietalScores[wine.varietal] ?? 0) * 2;
    const countryBonus = REGION_SCORE_MODIFIERS[wine.country]?.[wine.varietal]?.[activeKey] ?? 0;
    const subregionBonus = SUBREGION_SCORE_MODIFIERS[wine.state]?.[wine.varietal]?.[activeKey] ?? 0;
    const region = countryBonus + subregionBonus;
    const peak = getPeakProximityBonus(wine);
    const status = getDrinkabilityStatus(wine);
    const notReady = status === DRINKABILITY_STATUS.AGE_1_5 || status === DRINKABILITY_STATUS.AGE_5_PLUS;
    const tannin = notReady && activeKey
      ? (ROBUST_PAIRING_KEYS.has(activeKey) ? 1 : DELICATE_PAIRING_KEYS.has(activeKey) ? -1 : 0)
      : 0;
    const prep = preparation ? (PREPARATION_MODIFIERS[preparation]?.[wine.varietal] ?? 0) : 0;
    const { myRating } = getRatingInfo ? getRatingInfo(getWineKey(wine)) : { myRating: null };
    const rating = myRating >= 4 ? 1 : myRating !== null && myRating <= 2 ? -1 : 0;
    const occasion_ = occasion === 'casual'
      ? (isSpecialBottle(wine) ? -1 : 1)
      : occasion === 'fancy' && isSpecialBottle(wine) ? 1
      : occasion === 'celebration' && isSpecialBottle(wine) ? 2
      : 0;
    return { pairing, region, peak, tannin, prep, rating, occasion: occasion_ };
  };

  const compositeScore = (wine) => {
    const b = scoreBreakdown(wine);
    return b.pairing + b.region + b.peak + b.tannin + b.prep + b.rating + b.occasion;
  };


  const multiRack = racks?.length > 1;

  const recommendedBottles = useMemo(() => {
    if (!recommendedVarietals.length) return [];
    // Only recommend wines that are ready or in their final year — no point
    // serving something that shouldn't be opened yet.
    const matching = wines.filter(w => {
      if (!recommendedVarietals.includes(w.varietal)) return false;
      const status = getDrinkabilityStatus(w);
      return !status || status === DRINKABILITY_STATUS.READY_NOW || status === DRINKABILITY_STATUS.FINAL_YEAR;
    });

    const scoreCache = new Map(matching.map(w => [getWineKey(w), compositeScore(w)]));

    const sorted = [...matching].sort((a, b) => {
      // Same wine, different vintages: always prefer the older bottle
      if (a.producer === b.producer && a.name === b.name) {
        return (a.vintage ?? 9999) - (b.vintage ?? 9999);
      }
      const scoreDiff = scoreCache.get(getWineKey(b)) - scoreCache.get(getWineKey(a));
      if (scoreDiff !== 0) return scoreDiff;
      return occasion === 'casual'
        ? a.estimatedPrice - b.estimatedPrice
        : b.estimatedPrice - a.estimatedPrice;
    });

    // Celebration hard-filters to special bottles only (with fallback if none present).
    // Casual and Fancy show all matching wines — occasion preference is expressed via
    // compositeScore's occasionBonus, so cheaper/expensive bottles bubble up without
    // hiding anything (fixes the "all-special-bottle" caveat where casual fell back to
    // showing Dom Perignon only).
    if (occasion === 'celebration') {
      const special = sorted.filter(w => isSpecialBottle(w));
      return special.length > 0 ? special : sorted;
    }
    return sorted;
  }, [wines, recommendedVarietals, varietalScores, occasion, activeKey, preparation, getRatingInfo]);

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
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2 sm:gap-3 mb-4">
        {DISH_CATEGORIES.map(dish => {
          const isSelected = selectedDish?.id === dish.id;
          return (
            <button
              key={dish.id}
              onClick={() => {
                if (isSelected) {
                  setSelectedDish(null);
                  setSelectedSub(null);
                  setPreparation(null);
                } else {
                  setSelectedDish(dish);
                  setSelectedSub(null);
                  setPreparation(null);
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

      {/* Sub-category filter + preparation toggle */}
      {selectedDish && (
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
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
          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
            {['Light', 'Rich'].map(p => {
              const key = p.toLowerCase();
              return (
                <button
                  key={key}
                  onClick={() => setPreparation(preparation === key ? null : key)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all ${
                    preparation === key
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
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
                  .map(([v, score]) => (
                    <span
                      key={v}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${
                        score === 5
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : 'bg-gray-50 text-gray-600 border-gray-100'
                      }`}
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
              const wineRowProps = { varietalScores, wines, racks, getMatchReasons, scoreBreakdown, preparation, multiRack };

              const topStatus = getDrinkabilityStatus(topPick);
              const topPositions = getRackPositions(topPick, wines, racks);
              const topMatchReasons = getMatchReasons(topPick);

              return (
                <div>
                  {/* Top pick card */}
                  <div className={`mb-6 p-5 rounded-xl border ${(varietalScores[topPick.varietal] ?? 0) === 5 ? 'border-blue-200 bg-blue-50/50' : isSpecialBottle(topPick) ? 'border-blue-100 bg-blue-50/30' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-xs font-black uppercase tracking-widest text-amber-500 pt-0.5">Pick</span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        {topPick.quantity > 1 && <span className="text-xs text-gray-400 font-semibold tabular-nums">×{topPick.quantity}</span>}
                        <ScoreTag breakdown={scoreBreakdown(topPick)} preparation={preparation} />
                        {topStatus && <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${STATUS_STYLES[topStatus]}`}>{topStatus}</span>}
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
                        <WineRow key={getWineKey(wine)} wine={wine} index={i + 2} {...wineRowProps} />
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
