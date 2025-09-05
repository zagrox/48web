import { useContext } from 'react';
import { ConfigContext } from '../context/ConfigContext';

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};