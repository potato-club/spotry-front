import React, { useRef, useState } from 'react';

const useDragY = () => {

    const [isDragY, setIsDragY] = useState<boolean>(false);
    const [clickPoint, setClickPoint] = useState<number>(0);
    const [scrollTop, setScrollTop] = useState<number>(0); 
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        const scroll = divRef.current;
        if (scroll) {
            setIsDragY(true);
            setClickPoint(e.pageY - scroll.offsetTop);
            setScrollTop(scroll.scrollTop);
            // console.log('여기는 클릭 가능 영역');
        }
    };

    const handleMouseUp = () => {
        setIsDragY(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragY) return;

        e.preventDefault();

        const scroll = divRef.current;
        if (scroll) {
            const y = e.pageY - scroll.offsetTop; 
            const walk = y - clickPoint; 
            scroll.scrollTop = scrollTop - walk;
        }
    };

    return {
        divRef,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    };
};

export default useDragY;
