import React, { useState } from 'react';

const StarRating = ({ rating, onRate, size = 'md' }) => {
  const [hovered, setHovered] = useState(null);
  const sizeClass = size === 'sm' ? 'text-base' : 'text-2xl';
  const active = hovered ?? rating;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star === rating ? null : star)}
          onMouseEnter={() => onRate && setHovered(star)}
          onMouseLeave={() => onRate && setHovered(null)}
          className={`${sizeClass} leading-none transition-all ${
            active >= star ? 'text-amber-400' : 'text-gray-300'
          } ${onRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          disabled={!onRate}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
