import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts';

function gaussian(u) {
  return Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI);
}

function kde(prices, x, bandwidth) {
  return prices.reduce((sum, p) => sum + gaussian((x - p) / bandwidth), 0) / (prices.length * bandwidth);
}

function silverman(prices) {
  const n = prices.length;
  const mean = prices.reduce((a, b) => a + b, 0) / n;
  const variance = prices.reduce((s, p) => s + (p - mean) ** 2, 0) / n;
  const std = Math.sqrt(variance);
  return 1.06 * std * Math.pow(n, -0.2);
}

function median(sorted) {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1">
      ${Math.round(label)}
    </div>
  );
};

export default function PriceDistribution({ wines }) {
  const { points, medianPrice } = useMemo(() => {
    // Expand by quantity so each bottle counts
    const prices = [];
    for (const wine of wines) {
      if (wine.estimatedPrice > 0) {
        for (let i = 0; i < wine.quantity; i++) prices.push(wine.estimatedPrice);
      }
    }
    if (prices.length < 2) return { points: [], medianPrice: null };

    const sorted = [...prices].sort((a, b) => a - b);
    const med = median(sorted);
    const bw = silverman(prices);

    const min = Math.max(0, sorted[0] - bw * 2);
    const max = sorted[sorted.length - 1] + bw * 2;
    const steps = 120;
    const step = (max - min) / steps;

    const points = Array.from({ length: steps + 1 }, (_, i) => {
      const x = min + i * step;
      return { price: Math.round(x * 10) / 10, density: kde(prices, x, bw) };
    });

    return { points, medianPrice: med };
  }, [wines]);

  if (!points.length) {
    return <p className="text-xs text-gray-400 text-center py-8">No price data</p>;
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={points} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c1b3a" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c1b3a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="price"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={v => `$${Math.round(v)}`}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="density"
            stroke="#7c1b3a"
            strokeWidth={2}
            fill="url(#priceGrad)"
            dot={false}
            isAnimationActive={false}
          />
          <ReferenceLine
            x={medianPrice}
            stroke="#374151"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            label={{ value: `$${Math.round(medianPrice)}`, position: 'top', fontSize: 10, fill: '#374151' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-gray-400 mt-1">Median <span className="text-gray-600 font-semibold">${Math.round(medianPrice)}</span></p>
    </div>
  );
}
