import { useEffect, useState, useCallback, useRef } from "react";

/**
 * 최적화된 무한 스크롤 훅
 * - 불필요한 리렌더링 방지
 * - throttling 적용
 * - 메모리 누수 방지
 */
const useInfiniteScroll = (containerRef: React.RefObject<HTMLElement>, threshold: number = 1) => {
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const lastScrollTop = useRef(0);
    const throttleTimer = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container || isLoading) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        
        // 아래로 스크롤할 때만 실행
        if (scrollTop <= lastScrollTop.current) {
            lastScrollTop.current = scrollTop;
            return;
        }
        
        lastScrollTop.current = scrollTop;
        
        // 끝에 도달했는지 확인 (threshold 적용)
        if (scrollTop + clientHeight >= scrollHeight - threshold) {
            setIsEnd(true);
        }
    }, [containerRef, threshold, isLoading]);

    const throttledHandleScroll = useCallback(() => {
        if (throttleTimer.current) return;
        
        throttleTimer.current = setTimeout(() => {
            handleScroll();
            throttleTimer.current = null;
        }, 100); // 100ms throttle
    }, [handleScroll]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("scroll", throttledHandleScroll, { passive: true });
        
        return () => {
            container.removeEventListener("scroll", throttledHandleScroll);
            if (throttleTimer.current) {
                clearTimeout(throttleTimer.current);
            }
        };
    }, [containerRef, throttledHandleScroll]);

    // isEnd 상태 리셋
    useEffect(() => {
        if (isEnd) {
            const timer = setTimeout(() => {
                setIsEnd(false);
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [isEnd]);

    return {
        isEnd,
        isLoading,
        setIsLoading,
        // 수동 리셋 함수
        resetScroll: () => {
            setIsEnd(false);
            setIsLoading(false);
            lastScrollTop.current = 0;
        }
    };
};

export default useInfiniteScroll;