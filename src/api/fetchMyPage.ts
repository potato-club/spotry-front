import { getToken } from "../util/storage";
import url from "./url"

export const fetchMyPage = async () => {
    try {
        const response = await url.get('/mypage',{
            headers:{
                'Authorization': getToken()
            }
        });
        return response.data
    } catch (error) {
        throw error
    }
}