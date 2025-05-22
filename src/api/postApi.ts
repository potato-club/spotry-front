import { getToken } from "../util/storage";
import url from "./url"

export const getPopularPost = async () => {
    try {
        const response = await url.get('/main/hot');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUpComingPost = async () => {
    try {
        const response = await url.get('/main/urgent');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getMainPost = async () => {
    try {
        const response = await url.get('/post/main',{
            headers:{
                'Authorization': getToken(),
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCrewPost = async () => {
    try {
        const response = await url.get('/post/crew/1',{
            headers:{
                'Authorization': getToken()
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const writePost = async (formData: FormData) => {
    try {
        const response = await url.post('/post',formData, {
            headers:{
                'Authorization': getToken(),
            }
        })
        console.log(formData.get('sport'));
        return response;
    } catch (error) {
        console.log('포스팅 실패')
        console.log(error)
        throw error;
    }
}

export const getEachPost = async (id:number | null) => {
    try {

        const response = await url.get(`/post/${id}`,{
            headers:{
                'Authorization': getToken(),
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const clickLike = async (id:number | null) => {
    try {
        const response = await url.post(`/like/post/${id}`, {},{
            headers:{
                'Authorization': getToken(),
            }
        })
        return response.data
    } catch (error) {
        throw error       
    }
}

export const deletePost = async (id:number | null) => {
    try {
        const response = await url.delete(`/post/${id}`,{
            headers:{
                'Authorization': getToken(),
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}