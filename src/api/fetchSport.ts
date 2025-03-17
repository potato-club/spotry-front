import { getToken } from "../util/storage";
import url from "./url";

export const getSport = async() => {
    try {
        const response = await url.get('/sport',{
            headers:{
                'Authorization' : getToken()
            }
        });
        return response.data;
    } catch (error) {
        console.error("에러입니다 : ",error);
        throw error;
    }
};

