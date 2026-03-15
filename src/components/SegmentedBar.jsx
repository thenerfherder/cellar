import React from 'react';
import { getColorByIndex } from '../utils';
import { CONFIG } from '../constants';

export const SegmentedBar = ({ data, totalBottles, onSegmentClick }) => (
  <div className="w-full h-12 flex rounded overflow-hidden">
    {data.map((item, index) => (
      <div
        key={item.name}
        style={{
          width: `${(item.value / totalBottles) * 100}%`,
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

export const Legend = ({ data, onItemClick }) => (
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

export const SegmentedBarWithLegend = ({ data, onClick }) => {
  const totalBottles = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <>
      <div className="mb-4">
        <SegmentedBar data={data} totalBottles={totalBottles} onSegmentClick={onClick} />
      </div>
      <Legend data={data} onItemClick={onClick} />
    </>
  );
};
