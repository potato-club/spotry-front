import { useEffect, useState } from 'react';
import { Region } from '../../../types/Region';
import { getCities } from '../../../api/regionApi';

const useFetchCities = (id:number) => {

    const [cities,setCities] =useState<Region[]>([]);

    useEffect(() => {
        const fetchCitiesData = async() => {
            try {
                const data = await getCities(id);
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