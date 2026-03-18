import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import RackView from './RackView';
import { TASTING_NOTES, DEFAULT_TASTING_NOTES, getPairingsForWine } from './data';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';
import { useRatings } from './hooks/useRatings';
import { useCatalog } from './hooks/useCatalog';
import useWineFiltering from './hooks/useWineFiltering';
import { COLORS, CONFIG, DRINKABILITY_STATUS } from './constants';
import { sortWines, aggregateData, isSpecialBottle, getColorByIndex, getDrinkabilityStatus, getPeakYear, getWineKey } from './utils';
import { UserSettingsContext, DEFAULT_SETTINGS } from './UserSettingsContext';
import StatCard from './components/StatCard';
import StarRating from './components/StarRating';
import { SegmentedBarWithLegend } from './components/SegmentedBar';
import DetailModal from './components/DetailModal';
import WineList from './components/WineList';
import RackTab from './components/RackTab';
import AddWineModal from './components/AddWineModal';
import SettingsModal from './components/SettingsModal';
import SommelierView from './components/SommelierView';
import CellarAdvisorView from './components/CellarAdvisorView';

const WineCellar = () => {
  const { user, signOut } = useAuth();
  const { getRatingInfo, setRating } = useRatings(user);
  const { producers: catalogProducers, getWineNames: getCatalogWineNames } = useCatalog();
  const [wineData, setWineData] = useState([]);

  const allProducers = useMemo(() =>
    [...new Set([...catalogProducers, ...wineData.map(w => w.producer)])].sort(),
    [catalogProducers, wineData]
  );

  const getWineNames = useMemo(() => (producer) => {
    const fromCatalog = getCatalogWineNames(producer);
    const fromCollection = producer
      ? wineData.filter(w => w.producer === producer).map(w => w.name)
      : wineData.map(w => w.name);
    return [...new Set([...fromCatalog, ...fromCollection])].sort();
  }, [getCatalogWineNames, wineData]);
  const [winesLoading, setWinesLoading] = useState(true);
  const DEFAULT_RACK = { id: 'rack-1', name: 'Main Rack', rows: 10, cols: 12, layout: {} };
  const [racks, setRacks] = useState([DEFAULT_RACK]);
  const [activeRackId, setActiveRackId] = useState('rack-1');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      const data = snapshot.data();
      const wines = data?.wines ?? [];
      setWineData(wines);
      if (data?.racks) {
        setRacks(data.racks);
      } else if (data?.rackLayout) {
        // Migrate from old single-rack format
        setRacks([{ ...DEFAULT_RACK, layout: data.rackLayout, rows: data?.rackDimensions?.rows ?? 10, cols: data?.rackDimensions?.cols ?? 12 }]);
      }
      if (data?.settings) {
        setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
      }
      setWinesLoading(false);

      // Backfill catalog with any wines not yet present
      if (wines.length > 0) {
        const producers = [...new Set(wines.map(w => w.producer))];
        const entries = [...new Set(wines.map(w => `${w.producer}||${w.name}`))];
        setDoc(doc(db, 'catalog', 'wines'), {
          producers: arrayUnion(...producers),
          entries: arrayUnion(...entries),
        }, { merge: true });
      }
    });
    return unsubscribe;
  }, [user]);

  const saveRacks = async (newRacks) => {
    setRacks(newRacks);
    await setDoc(doc(db, 'users', user.uid), { racks: newRacks }, { merge: true });
  };

  const updateSettings = async (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    await setDoc(doc(db, 'users', user.uid), { settings: merged }, { merge: true });
  };

  const activeRack = racks.find(r => r.id === activeRackId) ?? racks[0];

  const updateActiveRack = (changes) =>
    saveRacks(racks.map(r => r.id === activeRack.id ? { ...r, ...changes } : r));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedVarietal, setSelectedVarietal] = useState(null);
  const [selectedDrinkability, setSelectedDrinkability] = useState(null);
  const [selectedVintage, setSelectedVintage] = useState(null);
  const [selectedPeakYear, setSelectedPeakYear] = useState(null);
  const [selectedWine, setSelectedWine] = useState(null);

  const [activeView, setActiveView] = useState('dashboard');
  const [detailsTab, setDetailsTab] = useState('collection');
  const [showAddWine, setShowAddWine] = useState(false);
  const [showEditWine, setShowEditWine] = useState(null);
  const [addWinePrefill, setAddWinePrefill] = useState(null);
  const updateCatalog = (wine) =>
    setDoc(doc(db, 'catalog', 'wines'), {
      producers: arrayUnion(wine.producer),
      entries: arrayUnion(`${wine.producer}||${wine.name}`),
    }, { merge: true });

  const handleAddWine = async (wine) => {
    const updated = [...wineData, wine];
    await Promise.all([
      setDoc(doc(db, 'users', user.uid), { wines: updated }, { merge: true }),
      updateCatalog(wine),
    ]);
    setShowAddWine(false);
    setAddWinePrefill(null);
  };

  const handleEditWine = async (originalWine, updatedWine) => {
    const origIdx = wineData.findIndex(w => getWineKey(w) === getWineKey(originalWine));
    if (origIdx === -1) return;
    const updatedWines = wineData.map((w, i) => i === origIdx ? updatedWine : w);

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

    await Promise.all([
      setDoc(doc(db, 'users', user.uid), { wines: updatedWines, racks: updatedRacks }, { merge: true }),
      updateCatalog(updatedWine),
    ]);
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

  const {
    filteredCellar,
    activeFilter,
    setActiveFilter,
    sortColumn,
    sortDirection,
    handleSort,
    resetAllFilters,
  } = useWineFiltering(sortedCellar);

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
      if (status) data[status] += wine.quantity;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [wineData]);

  if (winesLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest">Loading cellar…</p>
      </div>
    );
  }

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings }}>
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight uppercase">CELLAR</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Your Personal Collection</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowAddWine(true)}
              className="px-5 py-2 text-sm font-bold uppercase tracking-wider bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              + Add Wine
            </button>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Analyze
              </button>
              <button
                onClick={() => setActiveView('rack')}
                className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeView === 'rack'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Manage
              </button>
              <button
                onClick={() => setActiveView('sommelier')}
                className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeView === 'sommelier'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Pair
              </button>
            </div>
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" referrerPolicy="no-referrer" />
              )}
              <span className="text-xs text-gray-500 hidden sm:block">{user.displayName || user.email}</span>
              <button
                onClick={() => setShowSettings(true)}
                title="Settings"
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
              <button
                onClick={signOut}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Sommelier View */}
        {activeView === 'sommelier' && <SommelierView wines={wineData} racks={racks} />}


        {/* Rack View */}
        {activeView === 'rack' && (
          <>
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

        {/* Dashboard */}
        {activeView === 'dashboard' && <>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <StatCard label="Total Bottles" value={stats.totalBottles} />
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center relative">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-bold">Estimated Value</p>
            <p className="text-3xl font-black text-gray-900">
              {settings.showValue
                ? <><span style={{fontSize: '1em'}}>$</span>{Math.round(stats.totalValue).toLocaleString()}</>
                : <span className="tracking-widest text-gray-300">$——</span>
              }
            </p>
            <button
              onClick={() => updateSettings({ showValue: !settings.showValue })}
              className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 transition-colors"
              title={settings.showValue ? 'Hide value' : 'Show value'}
            >
              {settings.showValue ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              )}
            </button>
          </div>
          <StatCard
            label="Average Price"
            value={<><span style={{fontSize: '1em'}}>$</span>{Math.round(stats.averagePrice)}</>}
          />
          <StatCard label="Varietals" value={stats.uniqueVarietals} />
          <StatCard label="Countries" value={stats.uniqueCountries} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Left column: segmented bars */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">By Varietal</h2>
              <SegmentedBarWithLegend data={varietalData} onClick={setSelectedVarietal} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">By Country</h2>
              <SegmentedBarWithLegend data={regionData} onClick={setSelectedCountry} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">Drinkability</h2>
              <SegmentedBarWithLegend data={drinkabilityData} onClick={setSelectedDrinkability} />
            </div>
          </div>

          {/* Right column: bar charts */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">By Vintage</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={vintageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" onClick={(data) => setSelectedVintage(data.name)} className="cursor-pointer">
                    {vintageData.map((_entry, index) => (
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

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-tight">By Peak Year</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={peakData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" onClick={(data) => setSelectedPeakYear(data.name)} className="cursor-pointer">
                    {peakData.map((_entry, index) => (
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
        </div>

        {/* Details: Collection + Gaps tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {/* Tab header */}
          <div className="flex gap-0 mb-4 border-b border-gray-200">
            <button
              onClick={() => setDetailsTab('collection')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-colors ${
                detailsTab === 'collection'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Collection
            </button>
            <button
              onClick={() => setDetailsTab('gaps')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-colors ${
                detailsTab === 'gaps'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              Gaps
            </button>
          </div>

          {detailsTab === 'collection' && <div>
          <div className="mb-4">

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

            {activeFilter && (
              <div className="text-sm font-bold text-gray-600 mt-2">
                {filteredCellar.length} {filteredCellar.length === 1 ? 'bottle' : 'bottles'}
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-900">
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Producer</th>
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Wine</th>
                  <th className="hidden md:table-cell px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Varietal</th>
                  <th className="px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Country</th>
                  <th className="hidden md:table-cell px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">State</th>
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
                  <th className="hidden sm:table-cell px-2 py-2 font-black text-gray-900 text-xs uppercase tracking-wider text-left">Rating</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCellar.map((wine, index) => {
                  const isSpecial = isSpecialBottle(wine, settings.specialBottleThreshold);
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
                      if (filteredCellar[i].producer === wine.producer) producerRowspan++;
                      else break;
                    }
                  }

                  let rowspan = 1;
                  if (useGrouping && isNewGroup) {
                    for (let i = index + 1; i < filteredCellar.length; i++) {
                      if (filteredCellar[i].producer === wine.producer && filteredCellar[i].name === wine.name) rowspan++;
                      else break;
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
                          <td className="hidden md:table-cell px-2 py-1.5 text-gray-700 align-top text-sm" rowSpan={useGrouping ? rowspan : 1}>{wine.varietal}</td>
                          <td className="px-2 py-1.5 text-gray-700 align-top text-sm" rowSpan={useGrouping ? rowspan : 1}>{wine.country}</td>
                          <td className="hidden md:table-cell px-2 py-1.5 text-gray-700 align-top text-sm" rowSpan={useGrouping ? rowspan : 1}>{wine.state}</td>
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
                      <td className="hidden sm:table-cell px-2 py-1.5">
                        {(() => {
                          const { myRating, average, count } = getRatingInfo(getWineKey(wine));
                          if (myRating) return <StarRating rating={myRating} size="sm" />;
                          if (count > 0) return (
                            <div className="flex items-center gap-1 text-gray-400">
                              <StarRating rating={Math.round(average)} size="sm" />
                            </div>
                          );
                          return null;
                        })()}
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
            {activeFilter && filteredCellar.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {activeFilter === 'ready'
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
          </div>}

          {detailsTab === 'gaps' && <CellarAdvisorView wines={wineData} />}
        </div>

        {/* Detail modals — country, varietal, drinkability, vintage */}
        <DetailModal
          isOpen={!!(selectedCountry && selectedCountry !== 'Other')}
          onClose={() => setSelectedCountry(null)}
          title={selectedCountry}
          subtitle="Regional Breakdown"
        >
          <WineList
            wines={wineData.filter(w => w.country === selectedCountry)}
            onWineClick={setSelectedWine}
          />
        </DetailModal>

        <DetailModal
          isOpen={!!selectedVarietal}
          onClose={() => setSelectedVarietal(null)}
          title={selectedVarietal}
          subtitle="Varietal Collection"
        >
          <WineList
            wines={selectedVarietal === 'Other'
              ? wineData.filter(w => {
                  const count = wineData.filter(x => x.varietal === w.varietal).reduce((s, x) => s + x.quantity, 0);
                  return count < stats.totalBottles * CONFIG.OTHER_THRESHOLD;
                })
              : wineData.filter(w => w.varietal === selectedVarietal)
            }
            onWineClick={setSelectedWine}
          />
        </DetailModal>

        <DetailModal
          isOpen={!!selectedDrinkability}
          onClose={() => setSelectedDrinkability(null)}
          title={selectedDrinkability}
          subtitle="Drinkability Status"
        >
          <WineList
            wines={wineData.filter(w => getDrinkabilityStatus(w) === selectedDrinkability)}
            showDrinkWindow
            onWineClick={setSelectedWine}
          />
        </DetailModal>

        <DetailModal
          isOpen={!!selectedVintage}
          onClose={() => setSelectedVintage(null)}
          title={selectedVintage}
          subtitle="Vintage Collection"
        >
          <WineList
            wines={selectedVintage === 'NV'
              ? wineData.filter(w => w.vintage === null)
              : wineData.filter(w => w.vintage === parseInt(selectedVintage))
            }
            showDrinkWindow
            onWineClick={setSelectedWine}
          />
        </DetailModal>

        <DetailModal
          isOpen={!!selectedPeakYear}
          onClose={() => setSelectedPeakYear(null)}
          title={selectedPeakYear}
          subtitle="Peak Year Collection"
        >
          <WineList
            wines={selectedPeakYear === 'Unknown'
              ? wineData.filter(w => !getPeakYear(w))
              : wineData.filter(w => getPeakYear(w) === parseInt(selectedPeakYear))
            }
            showDrinkWindow
            onWineClick={setSelectedWine}
          />
        </DetailModal>

        </>}
      </div>

      {/* Wine detail modal */}
      <DetailModal
        isOpen={!!selectedWine}
        onClose={() => setSelectedWine(null)}
        title={
          <div className="flex items-center gap-2">
            <span>{selectedWine?.name}</span>
            {selectedWine && isSpecialBottle(selectedWine, settings.specialBottleThreshold) && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                Special
              </span>
            )}
          </div>
        }
        subtitle={selectedWine?.producer}
      >
        {selectedWine && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-black text-gray-900 uppercase">Details</h3>
                <button
                  onClick={() => setShowEditWine(selectedWine)}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-300 rounded-lg hover:text-gray-900 hover:border-gray-500 transition-colors"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Vintage</div>
                  <div className="text-sm font-bold text-gray-900">{selectedWine.vintage || 'NV'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Varietal</div>
                  <div className="text-sm font-bold text-gray-900">{selectedWine.varietal}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Country</div>
                  <div className="text-sm font-bold text-gray-900">{selectedWine.country}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">State / Region</div>
                  <div className="text-sm font-bold text-gray-900">{selectedWine.state}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Quantity</div>
                  <div className="text-sm font-bold text-gray-900">{selectedWine.quantity} bottles</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Price</div>
                  <div className="text-sm font-bold text-gray-900">${selectedWine.estimatedPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Drink Window</div>
                  <div className="text-sm font-bold text-gray-900">{selectedWine.drinkWindow}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Est. Peak: {getPeakYear(selectedWine)}</div>
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

            {(() => {
              const { myRating, average, count } = getRatingInfo(getWineKey(selectedWine));
              return (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase mb-3">Ratings</h3>
                  <div className="flex items-start gap-8">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1.5">Your Rating</div>
                      <StarRating
                        rating={myRating}
                        onRate={(r) => setRating(getWineKey(selectedWine), r)}
                      />
                    </div>
                    {count > 0 && (
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1.5">Community</div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={Math.round(average)} size="sm" />
                          <span className="text-sm font-bold text-gray-900">{average.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">({count})</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-black text-gray-900 uppercase mb-2">Tasting Notes</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {TASTING_NOTES[selectedWine.varietal] || DEFAULT_TASTING_NOTES}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-black text-gray-900 mb-2 uppercase">Perfect Pairings</h3>
              <div className="flex flex-wrap gap-1.5">
                {getPairingsForWine(selectedWine).map((pairing, idx) => (
                  <span
                    key={idx}
                    className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border border-gray-200"
                  >
                    {pairing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailModal>

      {showAddWine && (
        <AddWineModal
          onClose={() => { setShowAddWine(false); setAddWinePrefill(null); }}
          onSave={handleAddWine}
          prefill={addWinePrefill}
          catalogProducers={allProducers}
          getCatalogWineNames={getWineNames}
        />
      )}
      {showEditWine && (
        <AddWineModal
          onClose={() => setShowEditWine(null)}
          onSave={(updated) => handleEditWine(showEditWine, updated)}
          initialWine={showEditWine}
          catalogProducers={allProducers}
          getCatalogWineNames={getWineNames}
        />
      )}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={updateSettings}
      />
    </div>
    </UserSettingsContext.Provider>
  );
};

export default WineCellar;
