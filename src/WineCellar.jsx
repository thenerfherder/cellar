import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import RackView from './RackView';
import { TASTING_NOTES, DEFAULT_TASTING_NOTES, getPairingsForWine } from './data';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const COLORS = [
  '#E63946', '#F77F00', '#FCBF49', '#06A77D', '#118AB2', '#073B4C',
  '#8338EC', '#FF006E', '#FB5607', '#FFBE0B', '#8AC926', '#1982C4',
  '#6A4C93', '#D62828', '#F94144', '#FF9F1C', '#2EC4B6', '#9D4EDD'
];

const CONFIG = {
  OTHER_THRESHOLD: 0.05,
  CURRENT_YEAR: new Date().getFullYear(),
  MIN_SEGMENT_DISPLAY: 3,
  SPECIAL_BOTTLE_THRESHOLD: 70.00
};

const DRINKABILITY_STATUS = {
  FINAL_YEAR: 'Final Year',
  READY_NOW: 'Ready Now',
  AGE_1_5: 'Age 1-5 Years',
  AGE_5_PLUS: 'Age 5+ Years'
};


// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================


const sortWines = (wines) => [...wines].sort((a, b) => {
  const producerCompare = a.producer.localeCompare(b.producer);
  if (producerCompare !== 0) return producerCompare;
  const nameCompare = a.name.localeCompare(b.name);
  if (nameCompare !== 0) return nameCompare;
  if (a.vintage === null) return 1;
  if (b.vintage === null) return -1;
  return b.vintage - a.vintage;
});

const aggregateData = (items, keyExtractor, threshold) => {
  const map = {};
  items.forEach(item => {
    const key = keyExtractor(item);
    map[key] = (map[key] || 0) + item.quantity;
  });

  let otherCount = 0;
  const mainItems = [];

  Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, value]) => {
      if (value >= threshold) {
        mainItems.push({ name, value });
      } else {
        otherCount += value;
      }
    });

  if (otherCount > 0) mainItems.push({ name: 'Other', value: otherCount });
  return mainItems;
};

const isSpecialBottle = (wine) => wine.estimatedPrice > CONFIG.SPECIAL_BOTTLE_THRESHOLD;

const getColorByIndex = (index) => COLORS[index % COLORS.length];

const getDrinkabilityStatus = (wine) => {
  if (!wine.drinkWindow) return null;
  const [startYear, endYear] = wine.drinkWindow.split('-').map(y => parseInt(y));
  if (endYear === CONFIG.CURRENT_YEAR) {
    return DRINKABILITY_STATUS.FINAL_YEAR;
  } else if (CONFIG.CURRENT_YEAR >= startYear && CONFIG.CURRENT_YEAR < endYear) {
    return DRINKABILITY_STATUS.READY_NOW;
  } else if (startYear > CONFIG.CURRENT_YEAR) {
    if (startYear - CONFIG.CURRENT_YEAR <= 5) {
      return DRINKABILITY_STATUS.AGE_1_5;
    } else {
      return DRINKABILITY_STATUS.AGE_5_PLUS;
    }
  }
  return null;
};

const getPeakYear = (wine) => {
  if (!wine.drinkWindow) return null;
  const [startYear, endYear] = wine.drinkWindow.split('-').map(y => parseInt(y));
  return Math.round((startYear + endYear) / 2);
};

const getWineKey = (wine) => `${wine.producer}-${wine.name}-${wine.vintage}`;

const VARIETALS = {
  'Red': [
    'Barbera', 'Cabernet Franc', 'Cabernet Sauvignon', 'Gamay', 'Grenache',
    'Malbec', 'Merlot', 'Mourvèdre', 'Nebbiolo', 'Petit Verdot', 'Petite Sirah',
    'Pinot Noir', 'Sangiovese', 'Syrah', 'Tempranillo', 'Zinfandel',
  ],
  'White': [
    'Albariño', 'Chardonnay', 'Chenin Blanc', 'Gewürztraminer', 'Grüner Veltliner',
    'Marsanne', 'Muscat', 'Pinot Gris', 'Riesling', 'Roussanne',
    'Sauvignon Blanc', 'Viognier',
  ],
  'Rosé': ['Rosé'],
  'Blends': [
    'Bordeaux Blend', 'Cabernet Sauvignon Blend', 'Côtes du Rhône Red',
    'Grenache Blend', 'GSM Blend', 'Meritage', 'Red Blend', 'Rhône Blend', 'White Blend',
  ],
  'Sparkling': ['Champagne Blend', 'Crémant', 'Prosecco', 'Sparkling Wine'],
  'Dessert & Fortified': ['Late Harvest Riesling', 'Port', 'Sauternes', 'Sherry'],
};

const WINE_REGIONS = {
  'Argentina': ['Luján de Cuyo', 'Mendoza', 'Patagonia', 'Salta', 'San Juan'],
  'Australia': ['Barossa Valley', 'Clare Valley', 'Coonawarra', 'Eden Valley', 'Hunter Valley', 'Margaret River', 'McLaren Vale', 'Yarra Valley'],
  'Austria': ['Burgenland', 'Kamptal', 'Kremstal', 'Styria', 'Wachau'],
  'Chile': ['Aconcagua Valley', 'Bío Bío', 'Casablanca Valley', 'Colchagua Valley', 'Elqui Valley', 'Maipo Valley'],
  'France': ['Alsace', 'Beaujolais', 'Bordeaux', 'Burgundy', 'Champagne', 'Corsica', 'Languedoc-Roussillon', 'Loire Valley', 'Provence', 'Rhône Valley'],
  'Germany': ['Baden', 'Mosel', 'Nahe', 'Pfalz', 'Rheingau', 'Rheinhessen'],
  'Italy': ['Campania', 'Friuli-Venezia Giulia', 'Piedmont', 'Sardinia', 'Sicily', 'Tuscany', 'Umbria', 'Veneto'],
  'New Zealand': ['Central Otago', "Hawke's Bay", 'Marlborough', 'Martinborough', 'Nelson'],
  'Portugal': ['Alentejo', 'Bairrada', 'Dão', 'Douro', 'Vinho Verde'],
  'South Africa': ['Franschhoek', 'Paarl', 'Stellenbosch', 'Swartland', 'Walker Bay'],
  'Spain': ['Cava', 'Galicia', 'Jerez', 'Navarra', 'Priorat', 'Ribera del Duero', 'Rioja'],
  'USA': ['California', 'New York', 'Oregon', 'Virginia', 'Washington'],
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const WineCellar = () => {
  const { user, signOut } = useAuth();
  const [wineData, setWineData] = useState([]);
  const [winesLoading, setWinesLoading] = useState(true);

  const DEFAULT_RACK = { id: 'rack-1', name: 'Main Rack', rows: 10, cols: 12, layout: {} };
  const [racks, setRacks] = useState([DEFAULT_RACK]);
  const [activeRackId, setActiveRackId] = useState('rack-1');

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      const data = snapshot.data();
      setWineData(data?.wines ?? []);
      if (data?.racks) {
        setRacks(data.racks);
      } else if (data?.rackLayout) {
        // Migrate from old single-rack format
        setRacks([{ ...DEFAULT_RACK, layout: data.rackLayout, rows: data?.rackDimensions?.rows ?? 10, cols: data?.rackDimensions?.cols ?? 12 }]);
      }
      setWinesLoading(false);
    });
    return unsubscribe;
  }, [user]);

  const saveRacks = async (newRacks) => {
    setRacks(newRacks);
    await setDoc(doc(db, 'users', user.uid), { racks: newRacks }, { merge: true });
  };

  const activeRack = racks.find(r => r.id === activeRackId) ?? racks[0];

  const updateActiveRack = (changes) =>
    saveRacks(racks.map(r => r.id === activeRack.id ? { ...r, ...changes } : r));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedVarietal, setSelectedVarietal] = useState(null);
  const [selectedDrinkability, setSelectedDrinkability] = useState(null);
  const [selectedVintage, setSelectedVintage] = useState(null);
  const [selectedWine, setSelectedWine] = useState(null);
  const [generatedNotes, setGeneratedNotes] = useState({});
  const [loadingNoteFor, setLoadingNoteFor] = useState(null);
  const [pairingFilter, setPairingFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showPeakView, setShowPeakView] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'rack'
  const [showAddWine, setShowAddWine] = useState(false);
  const [showEditWine, setShowEditWine] = useState(null); // wine object being edited

  const handleAddWine = async (wine) => {
    const updated = [...wineData, wine];
    await setDoc(doc(db, 'users', user.uid), { wines: updated }, { merge: true });
    setShowAddWine(false);
  };

  const handleEditWine = async (originalWine, updatedWine) => {
    const origIdx = wineData.findIndex(w => getWineKey(w) === getWineKey(originalWine));
    if (origIdx === -1) return;
    const updatedWines = wineData.map((w, i) => i === origIdx ? updatedWine : w);

    // If quantity was reduced, remove now-invalid rack entries across all racks
    const updatedRacks = updatedWine.quantity < originalWine.quantity
      ? racks.map(rack => {
          const newLayout = {};
          Object.entries(rack.layout).forEach(([pos, occupant]) => {
            if (occupant.wineIdx === origIdx && occupant.bottleNum > updatedWine.quantity) return;
            newLayout[pos] = occupant;
          });
          return { ...rack, layout: newLayout };
        })
      : racks;

    await setDoc(doc(db, 'users', user.uid), { wines: updatedWines, racks: updatedRacks }, { merge: true });
    setShowEditWine(null);
    setSelectedWine(updatedWine);
  };

  const handleDrinkBottle = async (wine, e) => {
    e.stopPropagation();
    const drinkIdx = wineData.findIndex(w => getWineKey(w) === getWineKey(wine));
    const isLastBottle = wine.quantity === 1;

    const updatedWines = wineData
      .map(w => getWineKey(w) === getWineKey(wine) ? { ...w, quantity: w.quantity - 1 } : w)
      .filter(w => w.quantity > 0);

    // Clean up rack layout across all racks
    const updatedRacks = racks.map(rack => {
      const layout = { ...rack.layout };
      if (isLastBottle) {
        const newLayout = {};
        Object.entries(layout).forEach(([pos, occupant]) => {
          if (occupant.wineIdx === drinkIdx) return;
          const newIdx = occupant.wineIdx > drinkIdx ? occupant.wineIdx - 1 : occupant.wineIdx;
          newLayout[pos] = { ...occupant, wineIdx: newIdx };
        });
        return { ...rack, layout: newLayout };
      } else {
        const bottleToRemove = wine.quantity;
        const posToRemove = Object.keys(layout).find(
          pos => layout[pos].wineIdx === drinkIdx && layout[pos].bottleNum === bottleToRemove
        ) ?? Object.keys(layout).find(pos => layout[pos].wineIdx === drinkIdx);
        if (posToRemove) {
          const newLayout = { ...layout };
          delete newLayout[posToRemove];
          return { ...rack, layout: newLayout };
        }
        return rack;
      }
    });

    await setDoc(doc(db, 'users', user.uid), { wines: updatedWines, racks: updatedRacks }, { merge: true });
  };

  // Memoized calculations
  const stats = useMemo(() => {
    const totalBottles = wineData.reduce((sum, wine) => sum + wine.quantity, 0);
    const totalValue = wineData.reduce((sum, wine) => sum + (wine.quantity * wine.estimatedPrice), 0);
    const avgPrice = totalBottles > 0 ? totalValue / totalBottles : 0;

    return {
      totalBottles,
      totalValue,
      averagePrice: avgPrice,
      uniqueVarietals: new Set(wineData.map(w => w.varietal)).size,
      uniqueCountries: new Set(wineData.map(w => w.country)).size
    };
  }, [wineData]);

  const sortedCellar = useMemo(() => sortWines(wineData), [wineData]);

  const filteredCellar = useMemo(() => {
    let result = sortedCellar;

    if (pairingFilter.trim()) {
      const filterLower = pairingFilter.toLowerCase();
      result = result.filter(wine => {
        const pairings = getPairingsForWine(wine);
        return pairings.some(pairing => pairing.toLowerCase().includes(filterLower));
      });
    }

    if (activeFilter === 'ready') {
      result = result.filter(wine => {
        const status = getDrinkabilityStatus(wine);
        return status === DRINKABILITY_STATUS.READY_NOW || status === DRINKABILITY_STATUS.FINAL_YEAR;
      });
    } else if (activeFilter === 'atOrPastPeak') {
      result = result.filter(wine => {
        const peak = getPeakYear(wine);
        return peak && peak <= CONFIG.CURRENT_YEAR;
      });
    } else if (activeFilter === 'notReady') {
      result = result.filter(wine => {
        const status = getDrinkabilityStatus(wine);
        return status === DRINKABILITY_STATUS.AGE_1_5 || status === DRINKABILITY_STATUS.AGE_5_PLUS;
      });
    }

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        let aVal, bVal;

        switch (sortColumn) {
          case 'price':
            aVal = a.estimatedPrice;
            bVal = b.estimatedPrice;
            break;
          case 'vintage':
            aVal = a.vintage || 0;
            bVal = b.vintage || 0;
            break;
          case 'drinkability':
            const statusOrder = {
              [DRINKABILITY_STATUS.FINAL_YEAR]: 1,
              [DRINKABILITY_STATUS.READY_NOW]: 2,
              [DRINKABILITY_STATUS.AGE_1_5]: 3,
              [DRINKABILITY_STATUS.AGE_5_PLUS]: 4
            };
            aVal = statusOrder[getDrinkabilityStatus(a)] || 5;
            bVal = statusOrder[getDrinkabilityStatus(b)] || 5;
            break;
          case 'quantity':
            aVal = a.quantity;
            bVal = b.quantity;
            break;
          default:
            return 0;
        }

        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }

    return result;
  }, [sortedCellar, pairingFilter, activeFilter, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const resetAllFilters = () => {
    setPairingFilter('');
    setActiveFilter(null);
  };

  const varietalData = useMemo(() =>
    aggregateData(wineData, wine => wine.varietal, stats.totalBottles * CONFIG.OTHER_THRESHOLD),
    [wineData, stats.totalBottles]
  );

  const regionData = useMemo(() =>
    aggregateData(wineData, wine => wine.country, stats.totalBottles * CONFIG.OTHER_THRESHOLD),
    [wineData, stats.totalBottles]
  );

  const vintageData = useMemo(() => {
    const map = {};
    wineData.forEach(wine => {
      const vintage = wine.vintage ? wine.vintage.toString() : 'NV';
      map[vintage] = (map[vintage] || 0) + wine.quantity;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, value]) => ({ name, value }));
  }, [wineData]);

  const peakData = useMemo(() => {
    const map = {};
    wineData.forEach(wine => {
      const peak = getPeakYear(wine);
      const peakStr = peak ? peak.toString() : 'Unknown';
      map[peakStr] = (map[peakStr] || 0) + wine.quantity;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, value]) => ({ name, value }));
  }, [wineData]);

  const drinkabilityData = useMemo(() => {
    const data = {
      [DRINKABILITY_STATUS.FINAL_YEAR]: 0,
      [DRINKABILITY_STATUS.READY_NOW]: 0,
      [DRINKABILITY_STATUS.AGE_1_5]: 0,
      [DRINKABILITY_STATUS.AGE_5_PLUS]: 0
    };

    wineData.forEach(wine => {
      const status = getDrinkabilityStatus(wine);
      if (status) {
        data[status] += wine.quantity;
      }
    });

    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [wineData]);

  const getCountryDetails = (country) => {
    if (!country || country === 'Other') return null;
    return { wines: wineData.filter(wine => wine.country === country) };
  };

  const getVarietalDetails = (varietal) => {
    if (!varietal) return null;

    if (varietal === 'Other') {
      const threshold = stats.totalBottles * CONFIG.OTHER_THRESHOLD;
      return {
        wines: wineData.filter(wine => {
          const count = wineData.filter(w => w.varietal === wine.varietal)
            .reduce((sum, w) => sum + w.quantity, 0);
          return count < threshold;
        })
      };
    }

    return { wines: wineData.filter(wine => wine.varietal === varietal) };
  };

  const getDrinkabilityDetails = (status) => {
    if (!status) return null;
    return {
      wines: wineData.filter(wine => getDrinkabilityStatus(wine) === status)
    };
  };

  const getVintageDetails = (vintage) => {
    if (!vintage) return null;

    if (showPeakView) {
      if (vintage === 'Unknown') {
        return { wines: wineData.filter(wine => !getPeakYear(wine)) };
      }
      return { wines: wineData.filter(wine => getPeakYear(wine) === parseInt(vintage)) };
    } else {
      if (vintage === 'NV') return { wines: wineData.filter(wine => wine.vintage === null) };
      return { wines: wineData.filter(wine => wine.vintage === parseInt(vintage)) };
    }
  };

  const generateAITastingNotes = async (wine) => {
    const wineKey = getWineKey(wine);

    if (generatedNotes[wineKey]) {
      return generatedNotes[wineKey];
    }

    setLoadingNoteFor(wineKey);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `As an expert sommelier, write detailed tasting notes for this specific wine:

Producer: ${wine.producer}
Wine: ${wine.name}
Vintage: ${wine.vintage || 'Non-Vintage'}
Varietal: ${wine.varietal}
Country: ${wine.country}
State/Region: ${wine.state}
Price: ${wine.estimatedPrice}

Write 2-3 sentences of professional tasting notes that are specific to this producer, wine, and vintage. Consider:
- The producer's house style and reputation
- The specific vintage characteristics for this region
- The terroir of the region
- What the price point indicates about quality and aging potential
- Expected flavor profile, structure, and drinking experience

Write only the tasting notes, no preamble.`
            }
          ],
        })
      });

      const data = await response.json();
      const notes = data.content
        .filter(block => block.type === "text")
        .map(block => block.text)
        .join("\n");

      setGeneratedNotes(prev => ({ ...prev, [wineKey]: notes }));
      setLoadingNoteFor(null);

      return notes;
    } catch (error) {
      console.error("Failed to generate AI tasting notes:", error);
      setLoadingNoteFor(null);
      return null;
    }
  };

  // ============================================================================
  // COMPONENTS
  // ============================================================================

  const StatCard = ({ label, value }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-bold">{label}</p>
      <p className="text-3xl font-black text-gray-900">{value}</p>
    </div>
  );

  const SegmentedBar = ({ data, onSegmentClick }) => (
    <div className="w-full h-12 flex rounded overflow-hidden">
      {data.map((item, index) => (
        <div
          key={item.name}
          style={{
            width: `${(item.value / stats.totalBottles) * 100}%`,
            backgroundColor: getColorByIndex(index)
          }}
          className="flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onSegmentClick(item.name)}
        >
          {item.value >= CONFIG.MIN_SEGMENT_DISPLAY && `${item.value}`}
        </div>
      ))}
    </div>
  );

  const Legend = ({ data, onItemClick }) => (
    <div className="flex flex-wrap gap-4 justify-center">
      {data.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => onItemClick(item.name)}
        >
          <div
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: getColorByIndex(index) }}
          />
          <span className="text-xs text-gray-700 font-medium">{item.name} ({item.value})</span>
        </div>
      ))}
    </div>
  );

  const SegmentedBarWithLegend = ({ data, onClick }) => (
    <>
      <div className="mb-4">
        <SegmentedBar data={data} onSegmentClick={onClick} />
      </div>
      <Legend data={data} onItemClick={onClick} />
    </>
  );

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

  const DetailModal = ({ isOpen, onClose, title, subtitle, children }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
        onClick={onClose}
      >
        <div className="min-h-screen flex items-start justify-center p-4 py-8">
          <div
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10 rounded-t-lg">
              <div>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{title}</h2>
                <p className="text-gray-500 text-sm uppercase tracking-widest">{subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  const WineList = ({ wines, showDrinkWindow = false }) => (
    <div>
      <h3 className="text-xl font-black text-gray-900 mb-4 uppercase">Bottles in Collection</h3>
      <div className="space-y-3">
        {wines.map((wine, idx) => (
          <WineCard key={idx} wine={wine} showDrinkWindow={showDrinkWindow} onClick={setSelectedWine} />
        ))}
      </div>
    </div>
  );

  const RackTab = ({ rack, isActive, onClick, onRename, onDelete }) => {
    const [renaming, setRenaming] = useState(false);
    const [draft, setDraft] = useState(rack.name);
    const inputRef = useRef(null);

    const commitRename = () => {
      const name = draft.trim() || rack.name;
      setDraft(name);
      onRename(name);
      setRenaming(false);
    };

    useEffect(() => { if (renaming) inputRef.current?.select(); }, [renaming]);

    return (
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
          isActive
            ? 'bg-amber-900 text-amber-100 border-amber-900'
            : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500 hover:text-gray-900'
        }`}
        onClick={onClick}
      >
        {renaming ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') { setDraft(rack.name); setRenaming(false); } }}
            onClick={e => e.stopPropagation()}
            className="bg-transparent outline-none w-24 text-xs font-bold uppercase tracking-wider"
          />
        ) : (
          <span>{rack.name}</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); setDraft(rack.name); setRenaming(true); }}
          className={`opacity-50 hover:opacity-100 transition-opacity ${isActive ? 'text-amber-200' : 'text-gray-400'}`}
          title="Rename"
        >
          ✎
        </button>
        {onDelete && (
          <button
            onClick={e => { e.stopPropagation(); onDelete(); }}
            className={`opacity-50 hover:opacity-100 transition-opacity ${isActive ? 'text-amber-200' : 'text-gray-400'}`}
            title="Delete rack"
          >
            ×
          </button>
        )}
      </div>
    );
  };

  const AddWineModal = ({ onClose, onSave, initialWine }) => {
    const empty = { producer: '', name: '', vintage: '', varietal: '', country: '', state: '', quantity: '1', estimatedPrice: '', drinkWindow: '' };
    const [form, setForm] = useState(() => initialWine ? {
      producer: initialWine.producer,
      name: initialWine.name,
      vintage: initialWine.vintage != null ? String(initialWine.vintage) : '',
      varietal: initialWine.varietal,
      country: initialWine.country ?? '',
      state: initialWine.state ?? '',
      quantity: String(initialWine.quantity),
      estimatedPrice: String(initialWine.estimatedPrice),
      drinkWindow: initialWine.drinkWindow,
    } : empty);
    const [saving, setSaving] = useState(false);

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
    const setCountry = (e) => setForm(prev => ({ ...prev, country: e.target.value, state: '' }));

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      await onSave({
        producer: form.producer.trim(),
        name: form.name.trim(),
        vintage: form.vintage ? parseInt(form.vintage) : null,
        varietal: form.varietal,
        country: form.country,
        state: form.state,
        quantity: parseInt(form.quantity),
        estimatedPrice: parseFloat(form.estimatedPrice),
        drinkWindow: form.drinkWindow.trim(),
      });
      setSaving(false);
    };

    const field = (label, key, props = {}) => (
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</label>
        <input
          value={form[key]}
          onChange={set(key)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm"
          {...props}
        />
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
          <div className="border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{initialWine ? 'Edit Wine' : 'Add Wine'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none">×</button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {field('Producer', 'producer', { required: true, placeholder: 'e.g. Cayuse Vineyards' })}
              {field('Wine Name', 'name', { required: true, placeholder: 'e.g. Cailloux Vineyard' })}
              {field('Vintage', 'vintage', { type: 'number', placeholder: 'Leave blank for NV', min: 1800, max: new Date().getFullYear() })}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Varietal</label>
                <select
                  required
                  value={form.varietal}
                  onChange={set('varietal')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm bg-white"
                >
                  <option value="" disabled>Select a varietal…</option>
                  {Object.entries(VARIETALS).map(([group, options]) => (
                    <optgroup key={group} label={group}>
                      {options.map(v => <option key={v} value={v}>{v}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              {field('Quantity', 'quantity', { required: true, type: 'number', min: 1 })}
              {field('Price per Bottle ($)', 'estimatedPrice', { required: true, type: 'number', min: 0, step: '0.01', placeholder: '0.00' })}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Country</label>
                <select
                  required
                  value={form.country}
                  onChange={setCountry}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm bg-white"
                >
                  <option value="" disabled>Select country…</option>
                  {Object.keys(WINE_REGIONS).sort().map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">State / Region</label>
                <select
                  required
                  value={form.state}
                  onChange={set('state')}
                  disabled={!form.country}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-900 text-sm bg-white disabled:opacity-40"
                >
                  <option value="" disabled>Select state…</option>
                  {(WINE_REGIONS[form.country] ?? []).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            {field('Drink Window', 'drinkWindow', { required: true, placeholder: 'e.g. 2024-2035', pattern: '\\d{4}-\\d{4}' })}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-bold uppercase tracking-wider bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
                {saving ? 'Saving…' : initialWine ? 'Save Changes' : 'Add Wine'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (winesLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest">Loading cellar…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight uppercase">CELLAR</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Your Personal Collection</p>
          </div>
          <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddWine(true)}
            className="px-5 py-2 text-sm font-bold uppercase tracking-wider bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            + Add Wine
          </button>
          {/* View toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('rack')}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                activeView === 'rack'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              Rack View
            </button>
          </div>
          {/* User info + sign-out */}
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" referrerPolicy="no-referrer" />
            )}
            <span className="text-xs text-gray-500 hidden sm:block">{user.displayName || user.email}</span>
            <button
              onClick={signOut}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              Sign out
            </button>
          </div>
          </div>
        </div>

        {/* Rack View */}
        {activeView === 'rack' && (
          <>
            {/* Rack tabs */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {racks.map(rack => (
                <RackTab
                  key={rack.id}
                  rack={rack}
                  isActive={rack.id === activeRack.id}
                  onClick={() => setActiveRackId(rack.id)}
                  onRename={(name) => saveRacks(racks.map(r => r.id === rack.id ? { ...r, name } : r))}
                  onDelete={racks.length > 1 ? () => {
                    if (!window.confirm(`Delete "${rack.name}"? All bottle positions in this rack will be lost.`)) return;
                    const remaining = racks.filter(r => r.id !== rack.id);
                    if (activeRack.id === rack.id) setActiveRackId(remaining[0].id);
                    saveRacks(remaining);
                  } : null}
                />
              ))}
              <button
                onClick={() => {
                  const id = `rack-${Date.now()}`;
                  saveRacks([...racks, { id, name: 'New Rack', rows: 10, cols: 12, layout: {} }]);
                  setActiveRackId(id);
                }}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 border border-dashed border-gray-300 rounded-lg hover:text-gray-900 hover:border-gray-500 transition-colors"
              >
                + Add Rack
              </button>
            </div>

            <RackView
              wines={wineData}
              colors={COLORS}
              rackLayout={activeRack.layout}
              onRackLayoutChange={(layout) => updateActiveRack({ layout })}
              rackRows={activeRack.rows}
              onRackRowsChange={(rows) => updateActiveRack({ rows })}
              rackCols={activeRack.cols}
              onRackColsChange={(cols) => updateActiveRack({ cols })}
              onWineClick={setSelectedWine}
              allRackLayouts={racks.map(r => r.layout)}
            />
          </>
        )}

        {/* Dashboard — Stats Cards */}
        {activeView === 'dashboard' && <>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <StatCard label="Total Bottles" value={stats.totalBottles} />
          <StatCard
            label="Estimated Value"
            value={<><span style={{fontSize: '1em'}}>$</span>{Math.round(stats.totalValue).toLocaleString()}</>}
          />
          <StatCard
            label="Average Price"
            value={<><span style={{fontSize: '1em'}}>$</span>{Math.round(stats.averagePrice)}</>}
          />
          <StatCard label="Varietals" value={stats.uniqueVarietals} />
          <StatCard label="Countries" value={stats.uniqueCountries} />
        </div>

        {/* Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* By Varietal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">By Varietal</h2>
            <SegmentedBarWithLegend data={varietalData} onClick={setSelectedVarietal} />
          </div>

          {/* By Country */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">By Country</h2>
            <SegmentedBarWithLegend data={regionData} onClick={setSelectedCountry} />
          </div>

          {/* Drinkability */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">Drinkability</h2>
            <SegmentedBarWithLegend data={drinkabilityData} onClick={setSelectedDrinkability} />
          </div>

          {/* By Vintage / By Peak */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                {showPeakView ? 'By Peak Year' : 'By Vintage'}
              </h2>
              <button
                onClick={() => setShowPeakView(!showPeakView)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                {showPeakView ? 'Show Vintage' : 'Show Peak'}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={showPeakView ? peakData : vintageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" onClick={(data) => setSelectedVintage(data.name)} className="cursor-pointer">
                  {(showPeakView ? peakData : vintageData).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColorByIndex(index)}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complete Collection Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="mb-4">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-3">Complete Collection</h2>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => setActiveFilter(activeFilter === 'ready' ? null : 'ready')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === 'ready' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ready to Drink Now
              </button>

              <button
                onClick={() => setActiveFilter(activeFilter === 'atOrPastPeak' ? null : 'atOrPastPeak')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === 'atOrPastPeak' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                At or Past Peak
              </button>

              <button
                onClick={() => setActiveFilter(activeFilter === 'notReady' ? null : 'notReady')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === 'notReady' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Not Ready Yet
              </button>
            </div>

            {/* Custom Search */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for food pairings..."
                  value={pairingFilter}
                  onChange={(e) => {
                    setPairingFilter(e.target.value);
                    setActiveFilter(null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                {pairingFilter && (
                  <button
                    onClick={() => setPairingFilter('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
              {(pairingFilter || activeFilter) && (
                <div className="text-sm font-bold text-gray-600 whitespace-nowrap">
                  {filteredCellar.length} {filteredCellar.length === 1 ? 'bottle' : 'bottles'}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Producer</th>
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Wine</th>
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Varietal</th>
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Country</th>
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">State</th>
                  <th
                    className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('vintage')}
                  >
                    Vintage {sortColumn === 'vintage' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-center cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('quantity')}
                  >
                    Qty {sortColumn === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-right cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('price')}
                  >
                    Price {sortColumn === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left cursor-pointer hover:bg-gray-50 select-none"
                    onClick={() => handleSort('drinkability')}
                  >
                    Drink Window {sortColumn === 'drinkability' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCellar.map((wine, index) => {
                  const isSpecial = isSpecialBottle(wine);
                  const isFinalYear = getDrinkabilityStatus(wine) === DRINKABILITY_STATUS.FINAL_YEAR;

                  const useGrouping = !sortColumn;
                  const prevWine = useGrouping && index > 0 ? filteredCellar[index - 1] : null;
                  const isNewProducerGroup = !useGrouping || !prevWine || prevWine.producer !== wine.producer;
                  const isNewGroup = !useGrouping || !prevWine ||
                    prevWine.producer !== wine.producer ||
                    prevWine.name !== wine.name;

                  let producerRowspan = 1;
                  if (useGrouping && isNewProducerGroup) {
                    for (let i = index + 1; i < filteredCellar.length; i++) {
                      if (filteredCellar[i].producer === wine.producer) {
                        producerRowspan++;
                      } else {
                        break;
                      }
                    }
                  }

                  let rowspan = 1;
                  if (useGrouping && isNewGroup) {
                    for (let i = index + 1; i < filteredCellar.length; i++) {
                      if (filteredCellar[i].producer === wine.producer &&
                          filteredCellar[i].name === wine.name) {
                        rowspan++;
                      } else {
                        break;
                      }
                    }
                  }

                  return (
                    <tr
                      key={getWineKey(wine)}
                      className={`border-b transition-colors cursor-pointer ${
                        isSpecial
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                          : isFinalYear
                          ? 'bg-red-50 border-red-200 hover:bg-red-100'
                          : 'border-gray-100 hover:bg-gray-50'
                      } ${isNewProducerGroup ? 'border-t-2 border-t-gray-300' : ''}`}
                      onClick={() => setSelectedWine(wine)}
                    >
                      {(isNewProducerGroup || !useGrouping) && (
                        <td className="px-2 py-1.5 text-gray-900 font-medium align-top text-sm" rowSpan={useGrouping ? producerRowspan : 1}>
                          <div className="flex items-center gap-2">
                            {wine.producer}
                            {isSpecial && (
                              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">
                                Special
                              </span>
                            )}
                          </div>
                        </td>
                      )}
                      {(isNewGroup || !useGrouping) && (
                        <>
                          <td className="px-2 py-1.5 text-gray-900 font-semibold align-top text-sm" rowSpan={useGrouping ? rowspan : 1}>{wine.name}</td>
                          <td className="px-2 py-1.5 text-gray-700 align-top text-sm" rowSpan={useGrouping ? rowspan : 1}>{wine.varietal}</td>
                          <td className="px-2 py-1.5 text-gray-700 align-top text-sm" rowSpan={useGrouping ? rowspan : 1}>{wine.country}</td>
                          <td className="px-2 py-1.5 text-gray-700 align-top text-sm" rowSpan={useGrouping ? rowspan : 1}>{wine.state}</td>
                        </>
                      )}
                      <td className="px-2 py-1.5 text-gray-700 text-sm">{wine.vintage || 'NV'}</td>
                      <td className="px-2 py-1.5 text-gray-900 text-center font-bold text-sm">{wine.quantity}</td>
                      <td className="px-2 py-1.5 text-gray-700 text-right text-sm">${wine.estimatedPrice.toFixed(2)}</td>
                      <td className="px-2 py-1.5 text-gray-700 text-sm">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            {wine.drinkWindow}
                            {isFinalYear && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded uppercase whitespace-nowrap">
                                Final Year
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            Peak: {getPeakYear(wine)}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-1.5 text-right">
                        <button
                          onClick={(e) => handleDrinkBottle(wine, e)}
                          className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50"
                        >
                          Drink
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {(pairingFilter || activeFilter) && filteredCellar.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {pairingFilter
                    ? `No wines found that pair with "${pairingFilter}"`
                    : activeFilter === 'ready'
                    ? 'No wines are ready to drink now'
                    : activeFilter === 'atOrPastPeak'
                    ? 'No wines are at or past their estimated peak'
                    : 'No wines need additional aging'}
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <DetailModal
          isOpen={selectedCountry && selectedCountry !== 'Other'}
          onClose={() => setSelectedCountry(null)}
          title={selectedCountry}
          subtitle="Regional Breakdown"
        >
          {getCountryDetails(selectedCountry) && (
            <WineList wines={getCountryDetails(selectedCountry).wines} />
          )}
        </DetailModal>

        <DetailModal
          isOpen={!!selectedVarietal}
          onClose={() => setSelectedVarietal(null)}
          title={selectedVarietal}
          subtitle="Varietal Collection"
        >
          {getVarietalDetails(selectedVarietal) && (
            <WineList wines={getVarietalDetails(selectedVarietal).wines} />
          )}
        </DetailModal>

        <DetailModal
          isOpen={!!selectedDrinkability}
          onClose={() => setSelectedDrinkability(null)}
          title={selectedDrinkability}
          subtitle="Drinkability Status"
        >
          {getDrinkabilityDetails(selectedDrinkability) && (
            <WineList wines={getDrinkabilityDetails(selectedDrinkability).wines} showDrinkWindow />
          )}
        </DetailModal>

        <DetailModal
          isOpen={!!selectedVintage}
          onClose={() => setSelectedVintage(null)}
          title={selectedVintage}
          subtitle={showPeakView ? "Peak Year Collection" : "Vintage Collection"}
        >
          {getVintageDetails(selectedVintage) && (
            <WineList wines={getVintageDetails(selectedVintage).wines} showDrinkWindow />
          )}
        </DetailModal>

        </>}
      </div>

      <DetailModal
        isOpen={!!selectedWine}
        onClose={() => setSelectedWine(null)}
        title={
          <div className="flex items-center gap-2">
            <span>{selectedWine?.name}</span>
            {selectedWine && isSpecialBottle(selectedWine) && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                Special
              </span>
            )}
          </div>
        }
        subtitle={selectedWine?.producer}
      >
        {selectedWine && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-gray-900 uppercase">Details</h3>
                <button
                  onClick={() => setShowEditWine(selectedWine)}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-300 rounded-lg hover:text-gray-900 hover:border-gray-500 transition-colors"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Vintage</div>
                  <div className="text-lg font-bold text-gray-900">{selectedWine.vintage || 'NV'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Varietal</div>
                  <div className="text-lg font-bold text-gray-900">{selectedWine.varietal}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Country</div>
                  <div className="text-lg font-bold text-gray-900">{selectedWine.country}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">State / Region</div>
                  <div className="text-lg font-bold text-gray-900">{selectedWine.state}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Quantity</div>
                  <div className="text-lg font-bold text-gray-900">{selectedWine.quantity} bottles</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Price</div>
                  <div className="text-lg font-bold text-gray-900">${selectedWine.estimatedPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Drink Window</div>
                  <div className="text-lg font-bold text-gray-900">{selectedWine.drinkWindow}</div>
                  <div className="text-sm text-gray-500 mt-1">Est. Peak: {getPeakYear(selectedWine)}</div>
                </div>
                {(() => {
                  const wineIdx = wineData.findIndex(w => getWineKey(w) === getWineKey(selectedWine));
                  const positions = racks.flatMap(rack =>
                    Object.entries(rack.layout)
                      .filter(([, occupant]) => occupant.wineIdx === wineIdx)
                      .map(([pos]) => {
                        const [row, col] = pos.split('-').map(Number);
                        return { label: String.fromCharCode(65 + col) + (row + 1), rackName: rack.name };
                      })
                  ).sort((a, b) => a.rackName.localeCompare(b.rackName) || a.label.localeCompare(b.label));
                  if (positions.length === 0) return null;
                  return (
                    <div className="col-span-2">
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Rack Positions</div>
                      <div className="flex flex-wrap gap-1.5">
                        {positions.map(({ label, rackName }, i) => (
                          <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-800 text-sm font-bold rounded font-mono" title={rackName}>
                            {racks.length > 1 ? `${rackName}: ` : ''}{label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-black text-gray-900 uppercase">Tasting Notes</h3>
                <button
                  onClick={async () => {
                    const wineKey = getWineKey(selectedWine);
                    if (!generatedNotes[wineKey]) {
                      await generateAITastingNotes(selectedWine);
                    }
                  }}
                  disabled={loadingNoteFor === getWineKey(selectedWine)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    generatedNotes[getWineKey(selectedWine)]
                      ? 'bg-green-600 text-white cursor-default'
                      : loadingNoteFor === getWineKey(selectedWine)
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  }`}
                >
                  {loadingNoteFor === getWineKey(selectedWine)
                    ? 'Generating...'
                    : generatedNotes[getWineKey(selectedWine)]
                    ? '✓ AI Notes'
                    : 'Generate AI Notes'}
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {generatedNotes[getWineKey(selectedWine)] ||
                 TASTING_NOTES[selectedWine.varietal] ||
                  DEFAULT_TASTING_NOTES}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-black text-gray-900 mb-3 uppercase">Perfect Pairings</h3>
              <div className="flex flex-wrap gap-2">
                {getPairingsForWine(selectedWine).map((pairing, idx) => (
                  <span
                    key={idx}
                    className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-200"
                  >
                    {pairing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailModal>

      {showAddWine && <AddWineModal onClose={() => setShowAddWine(false)} onSave={handleAddWine} />}
      {showEditWine && (
        <AddWineModal
          onClose={() => setShowEditWine(null)}
          onSave={(updated) => handleEditWine(showEditWine, updated)}
          initialWine={showEditWine}
        />
      )}
    </div>
  );
};

export default WineCellar;
