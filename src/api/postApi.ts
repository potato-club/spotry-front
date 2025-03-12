import url from "./url"

export const getPopularPost = async () => {
    try {
        const response = await url.get('/main/hot');
        console.log(response.data);
        return response.data;
    } catch (error) {
        alert("인기 게시글 불러오기 실패");
        throw error;
    }
}

export const getUpComingPost = async () => {
    try {
        const response = await url.get('/main/urgent');
        console.log(response.data);
        return response.data;
    } catch (error) {
        alert("모집 임박글 불러오기 실해");
        throw error;
    }
}