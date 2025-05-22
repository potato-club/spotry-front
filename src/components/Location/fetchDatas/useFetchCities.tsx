import { useEffect, useState } from 'react';
import { Region } from '../../../types/Region';
import { fetchCities } from '../../../api/fetchRegion';

const useFetchCities = (id:number) => {

    const [cities,setCities] =useState<Region[]>([]);

    useEffect(() => {
        const fetchCitiesData = async() => {
            try {
                const data = await fetchCities(id);
                setCities(data);
            } catch (error) {
                console.log("cities 에러 : ", error);
            }
        }
        fetchCitiesData();
    },[id]);

    return {
        cities,
    }
};

export default useFetchCities;