import { useState, useEffect, useCallback, useRef } from 'react';

// API 호출 상태 인터페이스
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 캐시 인터페이스
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// 간단한 메모리 캐시
class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5분

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

    // 패턴 매칭으로 특정 키들만 삭제
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

// 전역 캐시 인스턴스
const apiCache = new ApiCache();

/**
 * API 호출을 최적화하는 커스텀 훅
 * - 중복 요청 방지
 * - 메모리 캐싱
 * - 로딩 상태 관리
 * - 에러 처리
 */
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

  // 컴포넌트 언마운트 시 정리
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

    // 캐시 확인
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

    // 진행 중인 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새 요청 시작
    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiCall();
      
      if (!mountedRef.current) return;

      // 캐시에 저장
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

      // AbortError는 무시
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

  // deps가 변경될 때 데이터 재요청
  useEffect(() => {
    fetchData();
  }, deps);

  // 강제 리프레시 함수
  const refetch = useCallback(() => {
    if (cacheKey) {
      apiCache.invalidate(cacheKey);
    }
    fetchData(true);
  }, [fetchData, cacheKey]);

  return {
    ...state,
    refetch,
    // 캐시 무효화 함수
    invalidateCache: () => cacheKey && apiCache.invalidate(cacheKey)
  };
};

/**
 * 특정 패턴의 캐시를 무효화하는 유틸리티 함수
 */
export const invalidateApiCache = (pattern?: string) => {
  apiCache.invalidate(pattern);
};

/**
 * 전체 캐시를 클리어하는 함수
 */
export const clearApiCache = () => {
  apiCache.clear();
};
