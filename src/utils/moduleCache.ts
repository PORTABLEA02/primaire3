// Cache pour les données des modules afin d'éviter les rechargements
class ModuleCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  // Définir la durée de vie par défaut (5 minutes)
  private defaultTTL = 5 * 60 * 1000;

  // Stocker des données dans le cache
  set(key: string, data: any, ttl: number = this.defaultTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  // Récupérer des données du cache
  get(key: string) {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Vérifier si les données ont expiré
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  // Vérifier si une clé existe et est valide
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  // Invalider une entrée du cache
  invalidate(key: string) {
    this.cache.delete(key);
  }

  // Invalider toutes les entrées d'un module
  invalidateModule(modulePrefix: string) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(modulePrefix)) {
        this.cache.delete(key);
      }
    }
  }

  // Nettoyer les entrées expirées
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Obtenir les statistiques du cache
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Instance singleton du cache
export const moduleCache = new ModuleCache();

// Hook pour utiliser le cache dans les composants
export const useModuleCache = (moduleKey: string) => {
  const getCachedData = (key: string) => {
    return moduleCache.get(`${moduleKey}:${key}`);
  };

  const setCachedData = (key: string, data: any, ttl?: number) => {
    moduleCache.set(`${moduleKey}:${key}`, data, ttl);
  };

  const invalidateCache = (key?: string) => {
    if (key) {
      moduleCache.invalidate(`${moduleKey}:${key}`);
    } else {
      moduleCache.invalidateModule(moduleKey);
    }
  };

  const hasCachedData = (key: string) => {
    return moduleCache.has(`${moduleKey}:${key}`);
  };

  return {
    getCachedData,
    setCachedData,
    invalidateCache,
    hasCachedData
  };
};