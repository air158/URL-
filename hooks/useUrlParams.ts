import { useState, useEffect } from 'react';
import { ParamEntry } from '../types';

export const useUrlParams = () => {
  const [params, setParams] = useState<ParamEntry[]>([]);

  useEffect(() => {
    const parseParams = () => {
      const entries: ParamEntry[] = [];
      let uniqueIdCounter = 0;

      // Helper to push entries safely
      const addEntry = (key: string, value: string) => {
        entries.push({
          id: `param-${uniqueIdCounter++}-${Date.now()}`,
          key: key,
          value: value,
        });
      };

      try {
        // 1. Parse standard Query String (?key=value)
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.forEach((value, key) => {
          addEntry(key, value);
        });

        // 2. Parse Hash Query String (common in some auth flows /#/path?key=value)
        if (window.location.hash.includes('?')) {
          const hashParts = window.location.hash.split('?');
          if (hashParts.length > 1) {
            const hashQuery = hashParts.slice(1).join('?');
            const hashSearchParams = new URLSearchParams(hashQuery);
            hashSearchParams.forEach((value, key) => {
              addEntry(key, value);
            });
          }
        }
      } catch (e) {
        console.error("Failed to parse URL parameters", e);
      }

      // If no parameters found, add default
      if (entries.length === 0) {
        addEntry('默认', 'api.momoai.pro');
      }

      setParams(entries);
    };

    parseParams();
    
    // Listen for popstate to handle back/forward navigation
    window.addEventListener('popstate', parseParams);
    return () => window.removeEventListener('popstate', parseParams);
  }, []);

  return { params };
};