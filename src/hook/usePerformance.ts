import { useEffect, useRef } from 'react';

/**
 * 컴포넌트 렌더링 성능을 모니터링하는 개발용 훅
 * 프로덕션에서는 비활성화됨
 */
export const useRenderMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      renderCount.current += 1;
      const now = Date.now();
      const timeSinceLastRender = now - lastRenderTime.current;
      
      console.log(`🔄 [${componentName}] 렌더링 #${renderCount.current} (${timeSinceLastRender}ms 후)`);
      
      if (timeSinceLastRender < 16) {
        console.warn(`⚠️ [${componentName}] 너무 빠른 리렌더링! (${timeSinceLastRender}ms)`);
      }
      
      lastRenderTime.current = now;
    }
  });

  return renderCount.current;
};

/**
 * 메모리 사용량을 모니터링하는 훅
 */
export const useMemoryMonitor = (componentName: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memory = (performance as any).memory;
      console.log(`💾 [${componentName}] 메모리 사용량:`, {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`
      });
    }
  });
};

/**
 * API 호출 지연시간을 측정하는 유틸리티
 */
export const measureApiCall = async <T>(
  apiCall: () => Promise<T>,
  apiName: string
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const result = await apiCall();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      if (duration > 1000) {
        console.warn(`🐌 [${apiName}] 느린 API 호출: ${duration.toFixed(2)}ms`);
      } else {
        console.log(`🚀 [${apiName}] API 호출: ${duration.toFixed(2)}ms`);
      }
    }
    
    return result;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ [${apiName}] API 호출 실패: ${duration.toFixed(2)}ms`, error);
    }
    
    throw error;
  }
};

/**
 * 성능 최적화 팁을 제공하는 개발용 함수
 */
export const performanceReport = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🔍 성능 최적화 리포트');
    
    // 토큰 관리자 상태 확인
    import('../util/tokenUtils').then(({ tokenManager }) => {
      console.log('✅ 토큰 관리: 이벤트 기반 (1초 polling 제거됨)');
      console.log('📊 토큰 상태:', {
        hasToken: !!tokenManager.getToken(),
        isValid: tokenManager.isTokenValid(),
        timeUntilExpiration: `${Math.round(tokenManager.getTimeUntilExpiration() / 1000)}초`
      });
    });
    
    // 메모리 정보
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('💾 메모리 사용량:', {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        efficiency: `${((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(1)}%`
      });
    }
    
    console.groupEnd();
  }
};
