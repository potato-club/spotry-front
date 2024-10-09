import { url } from "./url";

export const fetchSport = async() => {
    try {
        const response = await url.get('/sport');
        return response.data;
    } catch (error) {
        console.error("에러입니다 : ",error);
        throw error;
    }
};
