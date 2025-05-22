import { useEffect, useState, useCallback, useRef } from "react";


const useInfiniteScroll = (containerRef: React.RefObject<HTMLElement>, threshold: number = 1) => {
    const [isEnd, setIsEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const lastScrollTop = useRef(0);
    const throttleTimer = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container || isLoading) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        
        if (scrollTop <= lastScrollTop.current) {
            lastScrollTop.current = scrollTop;
            return;
        }
        
        lastScrollTop.current = scrollTop;
        
        if (scrollTop + clientHeight >= scrollHeight - threshold) {
            setIsEnd(true);
        }
    }, [containerRef, threshold, isLoading]);

    const throttledHandleScroll = useCallback(() => {
        if (throttleTimer.current) return;
        
        throttleTimer.current = setTimeout(() => {
            handleScroll();
            throttleTimer.current = null;
        }, 100); 
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
        resetScroll: () => {
            setIsEnd(false);
            setIsLoading(false);
            lastScrollTop.current = 0;
        }
    };
};

export default useInfiniteScroll;