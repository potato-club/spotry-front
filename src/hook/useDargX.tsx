import React, { useRef, useState } from 'react';

const useDargX = () => {

    const [isDargX,setIsDargX] = useState<boolean>(false);
    const [ClickPoint, setClickPoint] = useState<number>(0); 
    const [ScrollLeft,setScrollLeft] = useState<number>(0); 
    const DivRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e:React.MouseEvent) => {
        const Scroll = DivRef.current;
        if(Scroll){
            setIsDargX(true);
            setClickPoint(e.pageX - Scroll.offsetLeft);
            setScrollLeft(Scroll.scrollLeft);

        };
    };

    const handleMouseUp = () => {
        setIsDargX(false);
    }

    const handleMouseMove = (e:React.MouseEvent) => {
        if(!isDargX) return;

        e.preventDefault();

        const Scroll = DivRef.current;

        if(Scroll){
            const x = e.pageX - Scroll.offsetLeft;
            const walk = x - ClickPoint;
            Scroll.scrollLeft = ScrollLeft - walk;
        }
    }

    return {
        DivRef,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    }
};

export default useDargX;