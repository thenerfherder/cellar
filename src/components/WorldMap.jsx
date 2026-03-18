import { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO numeric → country name (wine-relevant countries + broad coverage)
const ISO_TO_NAME = {
  "4": "Afghanistan", "8": "Albania", "12": "Algeria", "24": "Angola",
  "32": "Argentina", "36": "Australia", "40": "Austria", "50": "Bangladesh",
  "56": "Belgium", "68": "Bolivia", "76": "Brazil", "100": "Bulgaria",
  "116": "Cambodia", "120": "Cameroon", "124": "Canada", "152": "Chile",
  "156": "China", "170": "Colombia", "191": "Croatia", "196": "Cyprus",
  "203": "Czech Republic", "208": "Denmark", "214": "Dominican Republic",
  "218": "Ecuador", "818": "Egypt", "231": "Ethiopia",
  "246": "Finland", "250": "France", "276": "Germany", "288": "Ghana",
  "300": "Greece", "320": "Guatemala", "332": "Haiti", "348": "Hungary",
  "356": "India", "360": "Indonesia", "364": "Iran", "368": "Iraq",
  "372": "Ireland", "376": "Israel", "380": "Italy", "388": "Jamaica",
  "392": "Japan", "400": "Jordan", "404": "Kenya", "410": "South Korea",
  "422": "Lebanon", "504": "Morocco", "484": "Mexico", "528": "Netherlands",
  "554": "New Zealand", "566": "Nigeria", "578": "Norway", "586": "Pakistan",
  "604": "Peru", "608": "Philippines", "616": "Poland", "620": "Portugal",
  "642": "Romania", "643": "Russia", "682": "Saudi Arabia", "686": "Senegal",
  "705": "Slovenia", "710": "South Africa", "724": "Spain", "752": "Sweden",
  "756": "Switzerland", "760": "Syria", "764": "Thailand", "788": "Tunisia",
  "792": "Turkey", "800": "Uganda", "804": "Ukraine",
  "784": "United Arab Emirates", "826": "United Kingdom",
  "840": "United States", "858": "Uruguay", "862": "Venezuela", "704": "Vietnam",
  "887": "Yemen", "716": "Zimbabwe",
};

// Normalize user-entered country names to match ISO_TO_NAME values
const NAME_ALIASES = {
  "USA": "United States",
  "UK": "United Kingdom",
  "Great Britain": "United Kingdom",
  "England": "United Kingdom",
  "Czechia": "Czech Republic",
  "Korea": "South Korea",
};

function normalizeCountry(name) {
  return NAME_ALIASES[name] ?? name;
}

export default function WorldMap({ data, onClick }) {
  const [tooltip, setTooltip] = useState(null);

  // Build lookup: normalized country name → bottle count
  const countsByCountry = {};
  for (const { name, value } of data) {
    countsByCountry[normalizeCountry(name)] = value;
  }

  const maxCount = Math.max(...Object.values(countsByCountry), 1);

  function getColor(geoId) {
    const countryName = ISO_TO_NAME[String(geoId)];
    const count = countsByCountry[countryName];
    if (!count) return '#e5e7eb'; // gray-200 for empty
    // Burgundy/wine color scale: light pink → deep burgundy
    const intensity = count / maxCount;
    // Interpolate from #f3d4de (light) to #7c1b3a (deep burgundy)
    const r = Math.round(243 - intensity * (243 - 124));
    const g = Math.round(212 - intensity * (212 - 27));
    const b = Math.round(222 - intensity * (222 - 58));
    return `rgb(${r},${g},${b})`;
  }

  function handleClick(geo) {
    const countryName = ISO_TO_NAME[String(geo.id)];
    if (countryName && countsByCountry[countryName]) {
      onClick(countryName);
    }
  }

  return (
    <div className="relative">
      <ComposableMap
        projectionConfig={{ scale: 180, center: [15, 10] }}
        style={{ width: '100%', height: '340px' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = ISO_TO_NAME[String(geo.id)];
              const count = countsByCountry[countryName];
              const hasWines = !!count;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(geo.id)}
                  stroke="#fff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: hasWines ? '#4c0519' : '#d1d5db', cursor: hasWines ? 'pointer' : 'default' },
                    pressed: { outline: 'none' },
                  }}
                  onClick={() => handleClick(geo)}
                  onMouseEnter={(e) => {
                    if (countryName) {
                      setTooltip({
                        name: countryName,
                        count,
                        x: e.clientX,
                        y: e.clientY,
                      });
                    }
                  }}
                  onMouseMove={(e) => {
                    if (tooltip) setTooltip(t => ({ ...t, x: e.clientX, y: e.clientY }));
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-gray-400">0</span>
        <div className="h-2 flex-1 rounded" style={{
          background: 'linear-gradient(to right, #f3d4de, #7c1b3a)',
        }} />
        <span className="text-xs text-gray-400">{maxCount} btl</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 28 }}
        >
          {tooltip.name}{tooltip.count ? `: ${tooltip.count} bottle${tooltip.count !== 1 ? 's' : ''}` : ''}
        </div>
      )}
    </div>
  );
}
