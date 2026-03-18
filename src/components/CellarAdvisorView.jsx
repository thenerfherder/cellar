import { useMemo } from 'react';
import { WINE_REGIONS } from '../constants';
import { WINE_PAIRINGS } from '../data';

const REGIONAL_SUGGESTIONS = {
  'Argentina': { varietals: ['Malbec', 'Cabernet Sauvignon'], note: 'Mendoza — world-class Malbec' },
  'Australia':  { varietals: ['Syrah', 'Chardonnay', 'Cabernet Sauvignon'], note: 'Barossa Shiraz, Margaret River Cab' },
  'Austria':    { varietals: ['Grüner Veltliner', 'Riesling'], note: 'Wachau & Kamptal whites' },
  'Chile':      { varietals: ['Carmenère', 'Cabernet Sauvignon'], note: 'Maipo/Colchagua — signature Carmenère' },
  'France':     { varietals: ['Pinot Noir', 'Bordeaux Blend', 'Champagne Blend', 'Syrah', 'Grenache Blend'], note: 'Burgundy, Bordeaux, Champagne, Rhône' },
  'Germany':    { varietals: ['Riesling', 'Gewürztraminer'], note: 'Mosel & Rheingau — stunning Riesling' },
  'Italy':      { varietals: ['Nebbiolo', 'Sangiovese', 'Barbera'], note: 'Barolo, Chianti, Piedmont' },
  'New Zealand':{ varietals: ['Sauvignon Blanc', 'Pinot Noir'], note: 'Marlborough & Central Otago' },
  'Portugal':   { varietals: ['Port', 'Tempranillo'], note: 'Douro reds & Vinho Verde whites' },
  'South Africa':{ varietals: ['Chenin Blanc', 'Cabernet Sauvignon'], note: 'Stellenbosch & Swartland' },
  'Spain':      { varietals: ['Tempranillo', 'Grenache'], note: 'Rioja, Priorat, Ribera del Duero' },
  'USA':        { varietals: ['Cabernet Sauvignon', 'Pinot Noir', 'Chardonnay', 'Zinfandel'], note: 'Napa, Sonoma, Willamette, Walla Walla' },
};

const DISH_CATEGORIES = [
  { label: 'Red Meat',    keywords: ['steak', 'beef', 'lamb', 'chops', 'ribs', 'short ribs', 'brisket', 'venison', 'wild game', 'game', 'chorizo'] },
  { label: 'Poultry',    keywords: ['chicken', 'duck', 'turkey'] },
  { label: 'Fish',       keywords: ['salmon', 'trout', 'fish'] },
  { label: 'Seafood',    keywords: ['oyster', 'lobster', 'seafood', 'shrimp', 'sushi', 'ceviche', 'caviar'] },
  { label: 'Pasta & Pizza', keywords: ['pasta', 'bolognese', 'osso buco', 'pizza', 'risotto'] },
  { label: 'Cheese',     keywords: ['cheese', 'charcuterie'] },
  { label: 'Vegetables', keywords: ['salad', 'mushroom', 'roasted vegetables', 'vegetable', 'ratatouille', 'mediterranean', 'herb'] },
];

function matchesDish(varietal, keywords) {
  const pairings = WINE_PAIRINGS[varietal] ?? [];
  return pairings.some(p => keywords.some(kw => p.toLowerCase().includes(kw)));
}

export default function CellarAdvisorView({ wines }) {
  const bottleCount = (list) => list.reduce((s, w) => s + w.quantity, 0);

  // --- Regional analysis ---
  const regionalAnalysis = useMemo(() => {
    const countByCountry = {};
    wines.forEach(w => {
      if (w.country) countByCountry[w.country] = (countByCountry[w.country] || 0) + w.quantity;
    });

    const knownCountries = Object.keys(WINE_REGIONS);
    const otherCountries = Object.keys(countByCountry).filter(c => !knownCountries.includes(c));
    const allCountries = [...knownCountries, ...otherCountries];

    return allCountries.map(country => ({
      country,
      bottles: countByCountry[country] || 0,
      suggestions: REGIONAL_SUGGESTIONS[country] ?? null,
    })).sort((a, b) => a.bottles - b.bottles || a.country.localeCompare(b.country));
  }, [wines]);

  const totalBottles = bottleCount(wines);

  // --- Food pairing analysis ---
  const pairingAnalysis = useMemo(() => {
    return DISH_CATEGORIES.map(cat => {
      const matching = wines.filter(w => matchesDish(w.varietal, cat.keywords));
      const bottles = bottleCount(matching);

      // Varietals from WINE_PAIRINGS that match this category but absent from cellar
      const cellarVarietals = new Set(wines.map(w => w.varietal));
      const suggestVarietals = Object.keys(WINE_PAIRINGS)
        .filter(v => !cellarVarietals.has(v) && matchesDish(v, cat.keywords))
        .slice(0, 4);

      return { ...cat, bottles, wineCount: matching.length, suggestVarietals };
    }).sort((a, b) => a.bottles - b.bottles);
  }, [wines]);

  const gapRegions  = regionalAnalysis.filter(r => r.bottles === 0);
  const thinRegions = regionalAnalysis.filter(r => r.bottles > 0 && r.bottles < 6);
  const okRegions   = regionalAnalysis.filter(r => r.bottles >= 6);

  const gapDishes  = pairingAnalysis.filter(d => d.bottles === 0);
  const thinDishes = pairingAnalysis.filter(d => d.bottles > 0 && d.bottles < 6);
  const okDishes   = pairingAnalysis.filter(d => d.bottles >= 6);

  return (
    <div className="space-y-10 mt-6">

      {/* ── Regional Coverage ─────────────────────────────────── */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">Regional Coverage</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">
            {gapRegions.length} missing · {thinRegions.length} thin · {okRegions.length} well-stocked
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {regionalAnalysis.map(({ country, bottles, suggestions }) => {
            const pct = totalBottles > 0 ? Math.round((bottles / totalBottles) * 100) : 0;
            const isEmpty = bottles === 0;
            const isThin  = !isEmpty && bottles < 6;

            return (
              <div
                key={country}
                className={`rounded-xl border p-4 ${
                  isEmpty
                    ? 'border-red-200 bg-red-50'
                    : isThin
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{country}</p>
                    {suggestions && (
                      <p className="text-xs text-gray-400 mt-0.5">{suggestions.note}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-lg font-black ${isEmpty ? 'text-red-500' : isThin ? 'text-amber-600' : 'text-gray-900'}`}>
                      {bottles}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">btl</span>
                  </div>
                </div>

                {!isEmpty && (
                  <div className="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isThin ? 'bg-amber-400' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(pct * 4, 100)}%` }}
                    />
                  </div>
                )}

                {isEmpty && suggestions && (
                  <div className="mt-2">
                    <p className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-1">Consider buying</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestions.varietals.map(v => (
                        <span key={v} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {isThin && suggestions && (
                  <div className="mt-2">
                    <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-1">Expand with</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestions.varietals.slice(0, 2).map(v => (
                        <span key={v} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Food Pairing Coverage ─────────────────────────────── */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">Food Pairing Coverage</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">
            {gapDishes.length} uncovered · {thinDishes.length} thin · {okDishes.length} well-covered
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pairingAnalysis.map(({ label, bottles, wineCount, suggestVarietals }) => {
            const isEmpty = bottles === 0;
            const isThin  = !isEmpty && bottles < 6;

            return (
              <div
                key={label}
                className={`rounded-xl border p-4 ${
                  isEmpty
                    ? 'border-red-200 bg-red-50'
                    : isThin
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-gray-100 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-gray-900">{label}</p>
                  <div className="text-right shrink-0">
                    <span className={`text-lg font-black ${isEmpty ? 'text-red-500' : isThin ? 'text-amber-600' : 'text-gray-900'}`}>
                      {bottles}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">btl</span>
                  </div>
                </div>

                {!isEmpty && (
                  <p className="text-xs text-gray-400 mt-0.5">{wineCount} {wineCount === 1 ? 'varietal' : 'varietals'} represented</p>
                )}

                {(isEmpty || isThin) && suggestVarietals.length > 0 && (
                  <div className="mt-2">
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isEmpty ? 'text-red-600' : 'text-amber-700'}`}>
                      {isEmpty ? 'No coverage — consider' : 'Expand with'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {suggestVarietals.map(v => (
                        <span key={v} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          isEmpty ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!isEmpty && !isThin && (
                  <div className="mt-2 h-1 rounded-full bg-emerald-100 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
