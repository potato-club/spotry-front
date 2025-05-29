import { getToken } from "../util/storage";
import url from "./url";


export const getSports = async () => {
    try {
        const response = await url.get('/sport', {
            headers: {
                'Authorization': getToken()
            }
        });
        return response.data;
    } catch (error) {
        console.error("스포츠 목록 조회 에러:", error);
        throw error;
    }
};

export const getSportDetail = async (sportId: number | null) => {
    try {
        const response = await url.get(`/sport/${sportId}`, {
            headers: {
                'Authorization': getToken(),
            }
        });
        return response.data;
    } catch (error) {
        console.error("스포츠 상세 조회 에러:", error);
        throw error;
    }
};