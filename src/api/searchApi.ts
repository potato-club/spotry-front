import { getToken } from "../util/storage"
import url from "./url"

export const getSearchTopTen = async () => {
    try {
        const response = await url.get('/main/search/top10', {
            headers:{
                'Authorization':getToken()
            }
        })
        return response.data
    } catch (error) {
        throw error;
    }
}