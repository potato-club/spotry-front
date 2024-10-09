import React, { useEffect, useState } from 'react';
import { fetchRegion } from '../../api/fetchRegion';

interface Region{
    id:number,
    name:string,
}

const RegionData = () => {

    const [region,setRegion] = useState<Region[]>([]);

    useEffect(() => {
        const fetchregionData = async() =>{
            try {
                const data = await fetchRegion();
                setRegion(data);
            } catch (error) {
                console.log("에러입니다 : ",error);
            }
        };
        fetchregionData();
    },[]);

    console.log(region);

    return (
        <div>
            
        </div>
    );
};

export default RegionData;