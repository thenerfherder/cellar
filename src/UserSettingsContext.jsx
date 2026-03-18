import { createContext, useContext } from 'react';
import { CONFIG } from './constants';

export const DEFAULT_SETTINGS = {
  specialBottleThreshold: CONFIG.SPECIAL_BOTTLE_THRESHOLD,
  showValue: true,
  showAvgPrice: true,
};

export const UserSettingsContext = createContext({ settings: DEFAULT_SETTINGS, updateSettings: () => {} });

export const useUserSettings = () => useContext(UserSettingsContext);
