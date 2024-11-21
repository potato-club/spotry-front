import { useEffect, useState } from "react";
import { Region } from "../../../types/Region";
import { fetchtowns } from "../../../api/fetchRegion";

const useFetchTowns = (id:number) => {

    const [towns,setTowns] = useState<Region[]>([]);

    useEffect(() => {
        const fetchTownsData = async() => {
            try {
                const data = await fetchtowns(id);
                setTowns(data);
            } catch (error) {
                console.log("twons fetch 에러 : ",error);
            }
        }
        fetchTownsData();
    },[id]);
    
    return {
        towns,
    }
};

export default useFetchTowns;