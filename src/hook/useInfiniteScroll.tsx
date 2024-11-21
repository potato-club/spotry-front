import { useEffect, useState } from "react";

const useInfiniteScroll = () => {

    const [isEnd,setIsEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20 && !isEnd){
                setIsEnd(true);
            };
        };
        window.addEventListener('scroll',handleScroll);
        return ()=>window.removeEventListener('scroll',handleScroll);
    },[isEnd])
    return isEnd;
};

export default useInfiniteScroll;