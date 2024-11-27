import { useEffect, useState } from "react";

const useInfiniteScroll = (ref:any) => {

    const [isEnd,setIsEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const divContainer = ref.current;
            if(!divContainer){
                return;
            }
            const {scrollTop, scrollHeight, clientHeight} = divContainer;
            if(scrollTop + clientHeight >= scrollHeight - 1){
                setIsEnd(true);
                console.log("닿았습니다");
            };
        };
        const container = ref.current;
        if(container){
            container.addEventListener("scroll", handleScroll);
        };
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    },[ref]);

    useEffect(() => {
        if(isEnd){
            setIsEnd(false);
            console.log("false로 바꿈");
        }
    },[isEnd]);

    return {isEnd};
};

export default useInfiniteScroll;