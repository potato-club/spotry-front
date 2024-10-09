import { url } from "./url";

export const fetchRegion = async() => {
    try {
        const response = await url.get('/region/');
        return response.data;
    } catch (error) {
        console.error('에러입니다 : ',error);
        throw error;
    }
};
