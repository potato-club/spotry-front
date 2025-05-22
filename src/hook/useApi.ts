import { useState, useEffect, useCallback, useRef } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000;

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL) {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  invalidate(pattern?: string) {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    const keys = Array.from(this.cache.keys());
    for (const key of keys) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  clear() {
    this.cache.clear();
  }
}

const apiCache = new ApiCache();

export const useApi = <T = any>(
  apiCall: () => Promise<T>,
  deps: React.DependencyList,
  options: {
    cacheKey?: string;
    cacheTTL?: number;
    enabled?: boolean;
  } = {}
) => {
  const { cacheKey, cacheTTL = 5 * 60 * 1000, enabled = true } = options;
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;

    if (cacheKey && !force) {
      const cachedData = apiCache.get<T>(cacheKey);
      if (cachedData) {
        setState({
          data: cachedData,
          loading: false,
          error: null
        });
        return;
      }
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiCall();
      
      if (!mountedRef.current) return;

      if (cacheKey) {
        apiCache.set(cacheKey, result, cacheTTL);
      }

      setState({
        data: result,
        loading: false,
        error: null
      });
    } catch (error) {
      if (!mountedRef.current) return;

      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      });
    } finally {
      abortControllerRef.current = null;
    }
  }, [apiCall, enabled, cacheKey, cacheTTL]);

  useEffect(() => {
    fetchData();
  }, deps);

  const refetch = useCallback(() => {
    if (cacheKey) {
      apiCache.invalidate(cacheKey);
    }
    fetchData(true);
  }, [fetchData, cacheKey]);

  return {
    ...state,
    refetch,
    invalidateCache: () => cacheKey && apiCache.invalidate(cacheKey)
  };
};

export const invalidateApiCache = (pattern?: string) => {
  apiCache.invalidate(pattern);
};


export const clearApiCache = () => {
  apiCache.clear();
};
