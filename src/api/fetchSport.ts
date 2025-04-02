import { getToken } from "../util/storage";
import url from "./url";

export const getSport = async() => {
    try {
        const response = await url.get('/sport',{
            headers:{
                'Authorization' : getToken()
            }
        });
        console.log()
        return response.data;
    } catch (error) {
        console.error("getSport 에러 : ",error);
        throw error;
    }
};

export const getDetailSport = async (id:number | null) => {
    try {
        const response = await url.get(`/sport/${id}`, {
            headers:{
                'Authorization': getToken(),
            }
        })
        return response.data
    } catch (error) {
        console.error("getDetailSport 에러 : ",error);
        throw error;
    }
}

