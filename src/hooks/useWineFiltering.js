import { useState, useMemo } from 'react';
import { getPairingsForWine } from '../data';
import { getDrinkabilityStatus, getPeakYear } from '../utils';
import { DRINKABILITY_STATUS, CONFIG } from '../constants';

const useWineFiltering = (sortedCellar) => {
  const [pairingFilter, setPairingFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

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
          case 'drinkability': {
            const statusOrder = {
              [DRINKABILITY_STATUS.FINAL_YEAR]: 1,
              [DRINKABILITY_STATUS.READY_NOW]: 2,
              [DRINKABILITY_STATUS.AGE_1_5]: 3,
              [DRINKABILITY_STATUS.AGE_5_PLUS]: 4
            };
            aVal = statusOrder[getDrinkabilityStatus(a)] || 5;
            bVal = statusOrder[getDrinkabilityStatus(b)] || 5;
            break;
          }
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

  return {
    filteredCellar,
    pairingFilter,
    setPairingFilter,
    activeFilter,
    setActiveFilter,
    sortColumn,
    sortDirection,
    handleSort,
    resetAllFilters,
  };
};

export default useWineFiltering;
