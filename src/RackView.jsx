import React, { useState, useMemo, useRef } from 'react';

// ── Bottle token (draggable circle representing one bottle) ──────────────────

const BottleToken = ({ wine, wineIdx, bottleNum, source, posKey, color, isDragging, size = 44, onDragStart, onDragEnd, onTooltipShow, onTooltipMove, onTooltipHide, onWineClick }) => {
  const initials = wine.producer
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
  const year = wine.vintage ? String(wine.vintage).slice(2) : 'NV';

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart?.({ wineIdx, bottleNum, source, posKey });
      }}
      onDragEnd={onDragEnd}
      onClick={() => onWineClick?.(wine)}
      onMouseEnter={onTooltipShow}
      onMouseMove={onTooltipMove}
      onMouseLeave={onTooltipHide}
      className="cursor-grab active:cursor-grabbing select-none flex flex-col items-center justify-center text-white font-bold rounded-full shadow-md hover:brightness-110 transition-all"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity: isDragging ? 0.3 : 1,
        fontSize: size <= 40 ? 8 : 9,
        lineHeight: 1.3,
        textAlign: 'center',
        textShadow: '0 1px 3px rgba(0,0,0,0.6)',
        flexShrink: 0,
      }}
    >
      <span>{initials}</span>
      <span>{year}</span>
    </div>
  );
};

// ── Single rack slot (circular hole) ────────────────────────────────────────

const RackSlot = ({ row, col, occupant, wine, color, draggingKey, isHovered, onDragOver, onDragLeave, onDrop, onBottleDragStart, onBottleDragEnd, onTooltipShow, onTooltipMove, onTooltipHide, onWineClick }) => {
  const posKey = `${row}-${col}`;
  const label = `${String.fromCharCode(65 + col)}${row + 1}`;

  return (
    <div
      className="relative flex items-center justify-center rounded-full border-2 transition-all"
      style={{
        width: 52,
        height: 52,
        borderColor: isHovered ? '#facc15' : 'rgba(120,53,15,0.6)',
        backgroundColor: isHovered ? 'rgba(250,204,21,0.15)' : 'rgba(28,10,2,0.55)',
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
      }}
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; onDragOver(posKey); }}
      onDragLeave={onDragLeave}
      onDrop={(e) => { e.preventDefault(); onDrop(posKey); }}
    >
      {/* Empty slot inner ring */}
      {!occupant && (
        <div
          className="rounded-full border"
          style={{ width: 28, height: 28, borderColor: 'rgba(120,53,15,0.35)', backgroundColor: 'rgba(0,0,0,0.3)' }}
        />
      )}

      {/* Bottle */}
      {occupant && wine && (
        <BottleToken
          wine={wine}
          wineIdx={occupant.wineIdx}
          bottleNum={occupant.bottleNum}
          source="rack"
          posKey={posKey}
          color={color}
          size={44}
          isDragging={draggingKey === `${occupant.wineIdx}-${occupant.bottleNum}`}
          onDragStart={onBottleDragStart}
          onDragEnd={onBottleDragEnd}
          onTooltipShow={onTooltipShow}
          onTooltipMove={onTooltipMove}
          onTooltipHide={onTooltipHide}
          onWineClick={onWineClick}
        />
      )}

      {/* Position label */}
      <span
        className="absolute bottom-0.5 right-1 pointer-events-none"
        style={{ fontSize: 7, color: isHovered ? '#fde68a' : 'rgba(180,120,60,0.7)', fontWeight: 700 }}
      >
        {label}
      </span>
    </div>
  );
};

// ── Main rack view ────────────────────────────────────────────────────────────

const RackView = ({ wines, colors, rackLayout, onRackLayoutChange, rackRows, onRackRowsChange, rackCols, onRackColsChange, onWineClick, allRackLayouts }) => {
  const [draggingKey, setDraggingKey] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [tooltip, setTooltip] = useState(null); // { wine, x, y }

  const dragInfoRef = useRef(null);

  // Build varietal → color map
  const varietalColors = useMemo(() => {
    const sorted = [...new Set(wines.map(w => w.varietal))].sort();
    return Object.fromEntries(sorted.map((v, i) => [v, colors[i % colors.length]]));
  }, [wines, colors]);

  const getColor = (wineIdx) => varietalColors[wines[wineIdx]?.varietal] ?? '#888';

  // All individual bottle objects
  const allBottles = useMemo(() =>
    wines.flatMap((wine, wineIdx) =>
      Array.from({ length: wine.quantity }, (_, i) => ({
        wineIdx, bottleNum: i + 1, key: `${wineIdx}-${i + 1}`,
      }))
    ), [wines]);

  const placedKeys = useMemo(() =>
    new Set((allRackLayouts ?? [rackLayout]).flatMap(layout =>
      Object.values(layout).map(({ wineIdx, bottleNum }) => `${wineIdx}-${bottleNum}`)
    )),
    [allRackLayouts, rackLayout]);

  const unplacedBottles = useMemo(() =>
    allBottles.filter(b => !placedKeys.has(b.key)),
    [allBottles, placedKeys]);

  // ── Drag handlers ─────────────────────────────────────────────────────────

  const handleBottleDragStart = (info) => {
    dragInfoRef.current = info;
    setDraggingKey(`${info.wineIdx}-${info.bottleNum}`);
  };

  const handleBottleDragEnd = () => {
    dragInfoRef.current = null;
    setDraggingKey(null);
    setHoveredSlot(null);
  };

  const handleSlotDrop = (targetPosKey) => {
    const info = dragInfoRef.current;
    if (!info) return;
    const { wineIdx, bottleNum, source, posKey: srcPosKey } = info;

    const next = { ...rackLayout };
    const displaced = next[targetPosKey];

    if (source === 'rack') delete next[srcPosKey];
    if (displaced && source === 'rack') next[srcPosKey] = displaced;
    next[targetPosKey] = { wineIdx, bottleNum };

    onRackLayoutChange(next);
    dragInfoRef.current = null;
    setDraggingKey(null);
    setHoveredSlot(null);
  };

  const handlePaletteDrop = (e) => {
    e.preventDefault();
    const info = dragInfoRef.current;
    if (info?.source === 'rack') {
      const next = { ...rackLayout };
      delete next[info.posKey];
      onRackLayoutChange(next);
    }
    dragInfoRef.current = null;
    setDraggingKey(null);
  };

  // ── Tooltip helpers ───────────────────────────────────────────────────────

  const makeTooltipHandlers = (wine) => ({
    onTooltipShow: (e) => setTooltip({ wine, x: e.clientX, y: e.clientY }),
    onTooltipMove: (e) => setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null),
    onTooltipHide: () => setTooltip(null),
  });

  // ── Render ────────────────────────────────────────────────────────────────

  const filledCount = Object.keys(rackLayout).length;
  const totalSlots = rackRows * rackCols;

  return (
    <div className="space-y-6">
      {/* View header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Wine Rack</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            {filledCount} of {totalSlots} slots filled · {unplacedBottles.length} bottles unplaced
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Rack size controls */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700">
            <span className="text-gray-500 uppercase tracking-wider" style={{ fontSize: 10 }}>Rows</span>
            <button onClick={() => onRackRowsChange(Math.max(1, rackRows - 1))} className="w-5 h-5 flex items-center justify-center bg-white rounded shadow text-gray-700 hover:bg-gray-50">−</button>
            <span className="w-5 text-center">{rackRows}</span>
            <button onClick={() => onRackRowsChange(Math.min(20, rackRows + 1))} className="w-5 h-5 flex items-center justify-center bg-white rounded shadow text-gray-700 hover:bg-gray-50">+</button>
            <span className="text-gray-300 mx-1">|</span>
            <span className="text-gray-500 uppercase tracking-wider" style={{ fontSize: 10 }}>Cols</span>
            <button onClick={() => onRackColsChange(Math.max(1, rackCols - 1))} className="w-5 h-5 flex items-center justify-center bg-white rounded shadow text-gray-700 hover:bg-gray-50">−</button>
            <span className="w-5 text-center">{rackCols}</span>
            <button onClick={() => onRackColsChange(Math.min(24, rackCols + 1))} className="w-5 h-5 flex items-center justify-center bg-white rounded shadow text-gray-700 hover:bg-gray-50">+</button>
          </div>

        </div>
      </div>

      {/* The rack */}
      <div className="overflow-x-auto">
      <div className="inline-block bg-amber-900 rounded-xl p-5 shadow-2xl" style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #78350f 100%)' }}>
        {/* Column labels */}
        <div className="flex gap-1 mb-2" style={{ paddingLeft: 24 }}>
          {Array.from({ length: rackCols }, (_, col) => (
            <div key={col} className="text-amber-400 font-bold text-center" style={{ width: 52, fontSize: 10 }}>
              {String.fromCharCode(65 + col)}
            </div>
          ))}
        </div>

        {/* Grid rows */}
        <div className="inline-flex flex-col gap-1">
          {Array.from({ length: rackRows }, (_, row) => (
            <div key={row} className="flex gap-1 items-center">
              {/* Row label */}
              <span className="text-amber-400 font-bold text-right" style={{ width: 18, fontSize: 10 }}>
                {row + 1}
              </span>
              {Array.from({ length: rackCols }, (_, col) => {
                const posKey = `${row}-${col}`;
                const occupant = rackLayout[posKey];
                const wine = occupant ? wines[occupant.wineIdx] : null;
                const color = occupant ? getColor(occupant.wineIdx) : null;
                const ttHandlers = wine ? makeTooltipHandlers(wine) : {};

                return (
                  <RackSlot
                    key={col}
                    row={row}
                    col={col}
                    occupant={occupant}
                    wine={wine}
                    color={color}
                    draggingKey={draggingKey}
                    isHovered={hoveredSlot === posKey}
                    onDragOver={setHoveredSlot}
                    onDragLeave={() => setHoveredSlot(null)}
                    onDrop={handleSlotDrop}
                    onBottleDragStart={handleBottleDragStart}
                    onBottleDragEnd={handleBottleDragEnd}
                    onTooltipShow={ttHandlers.onTooltipShow}
                    onTooltipMove={ttHandlers.onTooltipMove}
                    onTooltipHide={ttHandlers.onTooltipHide}
                    onWineClick={onWineClick}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Varietal legend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-3">Legend</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {Object.entries(varietalColors).map(([varietal, color]) => (
            <div key={varietal} className="flex items-center gap-1.5">
              <div className="rounded-full shadow-sm flex-shrink-0" style={{ width: 14, height: 14, backgroundColor: color }} />
              <span className="text-xs text-gray-700 font-medium">{varietal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Unplaced bottles palette */}
      <div
        className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 p-6"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handlePaletteDrop}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Unplaced Bottles</h3>
            <p className="text-gray-400 text-xs mt-0.5">Drag onto the rack · Drag a rack bottle here to remove it</p>
          </div>
          {unplacedBottles.length > 0 && (
            <span className="text-3xl font-black text-gray-200">{unplacedBottles.length}</span>
          )}
        </div>

        {unplacedBottles.length === 0 ? (
          <p className="text-green-600 font-bold text-sm">All bottles placed in the rack!</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {unplacedBottles.map(({ wineIdx, bottleNum, key }) => {
              const wine = wines[wineIdx];
              const ttHandlers = makeTooltipHandlers(wine);
              return (
                <BottleToken
                  key={key}
                  wine={wine}
                  wineIdx={wineIdx}
                  bottleNum={bottleNum}
                  source="palette"
                  posKey={null}
                  color={getColor(wineIdx)}
                  size={48}
                  isDragging={draggingKey === key}
                  onDragStart={handleBottleDragStart}
                  onDragEnd={handleBottleDragEnd}
                  {...ttHandlers}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Floating tooltip */}
      {tooltip?.wine && (
        <div
          className="fixed z-50 rounded-xl p-3 shadow-2xl pointer-events-none"
          style={{
            left: tooltip.x + 16,
            top: tooltip.y - 10,
            maxWidth: 260,
            background: 'rgba(17,24,39,0.95)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div className="text-white font-black text-sm leading-tight">{tooltip.wine.producer}</div>
          <div className="text-gray-300 font-semibold text-sm">{tooltip.wine.name}</div>
          <div className="text-gray-400 text-xs mt-1.5">
            {tooltip.wine.vintage ?? 'NV'} · {tooltip.wine.varietal}
          </div>
          <div className="text-gray-500 text-xs">{tooltip.wine.region}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-400 font-bold text-xs">${tooltip.wine.estimatedPrice}</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-green-400 text-xs font-medium">Drink {tooltip.wine.drinkWindow}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RackView;
