import { useEffect, useState } from 'react';
import { Region } from '../../../types/Region';
import { fetchRegion } from '../../../api/fetchRegion';

const useFetchRegionData = () => {

    const [region,setRegion] = useState<Region[]>([]);

    useEffect(() => {
        const fetchRegionData = async() => {
            try {
                const data = await fetchRegion();
                console.log('region data fetch 성공')
                setRegion(data);
            } catch (error) {
                console.error("region fetch 에러 : ",error);
            }
        }
        fetchRegionData();
    },[])
    
    return {
        region,
    }
};

export default useFetchRegionData;