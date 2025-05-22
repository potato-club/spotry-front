import { useEffect, useState } from "react";
import { Region } from "../../../types/Region";
import { getTowns } from "../../../api/regionApi";

const useFetchTowns = (id:number) => {

    const [towns,setTowns] = useState<Region[]>([]);

    useEffect(() => {
        const fetchTownsData = async() => {
            try {
                const data = await getTowns(id);
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