import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AppConfig {
  app_backend: string;
  app_logo: string;
  // Add other config fields as needed
}

interface ConfigContextType {
  config: AppConfig | null;
  loading: boolean;
  error: Error | null;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
}

const API_URL = 'https://crm.ir48.com/items/configuration';

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.statusText}`);
        }
        const jsonResponse = await response.json();
        setConfig(jsonResponse.data);
      } catch (e) {
        if (e instanceof Error) {
            setError(e);
        } else {
            setError(new Error('An unknown error occurred'));
        }
        console.error("Error fetching app configuration:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const value = { config, loading, error };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};