import { useEffect, useState } from 'react';
import { HouseAddress } from '../types/HouseAddress';

const useCheckOverlap = (HouseArr:HouseAddress[]) => {
    // true는 중복이 아닐경우
    const [isOverlap,setIsOverlap] = useState<boolean>(true);

    useEffect(() => {
        if(HouseArr.length <= 1) {
            setIsOverlap(true)
            return;
        };

        const [frist, second] = HouseArr;

        if(frist.city === second.city 
            && frist.district === second.district 
            && frist.neighbor === second.neighbor){
                setIsOverlap(false);
            } else{
                setIsOverlap(true);
            }
        },[HouseArr]);

    return {
        isOverlap
    };
};

export default useCheckOverlap;