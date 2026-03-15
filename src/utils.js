import { COLORS, CONFIG, DRINKABILITY_STATUS } from './constants';

export const sortWines = (wines) => [...wines].sort((a, b) => {
  const producerCompare = a.producer.localeCompare(b.producer);
  if (producerCompare !== 0) return producerCompare;
  const nameCompare = a.name.localeCompare(b.name);
  if (nameCompare !== 0) return nameCompare;
  if (a.vintage === null) return 1;
  if (b.vintage === null) return -1;
  return b.vintage - a.vintage;
});

export const aggregateData = (items, keyExtractor, threshold) => {
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

export const isSpecialBottle = (wine) => wine.estimatedPrice > CONFIG.SPECIAL_BOTTLE_THRESHOLD;

export const getColorByIndex = (index) => COLORS[index % COLORS.length];

export const getDrinkabilityStatus = (wine) => {
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

export const getPeakYear = (wine) => {
  if (!wine.drinkWindow) return null;
  const [startYear, endYear] = wine.drinkWindow.split('-').map(y => parseInt(y));
  return Math.round((startYear + endYear) / 2);
};

export const getWineKey = (wine) => `${wine.producer}-${wine.name}-${wine.vintage}`;
