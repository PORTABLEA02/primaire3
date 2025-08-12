import { useState, useEffect, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key: string;
}

export function useDataCache<T>(
  fetchFunction: () => Promise<T>,
  options: CacheOptions
) {
  const { ttl = 5 * 60 * 1000, key } = options; // Default 5 minutes
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number | null>(null);

  // Vérifier si les données en cache sont encore valides
  const isCacheValid = useCallback(() => {
    if (!lastFetch) return false;
    return Date.now() - lastFetch < ttl;
  }, [lastFetch, ttl]);

  // Charger les données depuis le cache ou l'API
  const loadData = useCallback(async (forceRefresh = false) => {
    // Si on a des données valides en cache et qu'on ne force pas le refresh
    if (!forceRefresh && data && isCacheValid()) {
      return data;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchFunction();
      setData(result);
      setLastFetch(Date.now());
      
      return result;
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [data, isCacheValid, fetchFunction]);

  // Charger les données au montage si pas en cache
  useEffect(() => {
    if (!data) {
      loadData();
    }
  }, []);

  // Fonction pour rafraîchir manuellement
  const refresh = useCallback(() => {
    return loadData(true);
  }, [loadData]);

  // Fonction pour invalider le cache
  const invalidate = useCallback(() => {
    setData(null);
    setLastFetch(null);
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    invalidate,
    isStale: !isCacheValid(),
    lastFetch
  };
}