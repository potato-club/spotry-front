import { getToken } from "../util/storage";
import url from "./url";


export const getRegions = async () => {
    try {
        const response = await url.get('/region/region');
        return response.data;
    } catch (error) {
        console.error('지역 목록 조회 에러:', error);
        throw error;
    }
};

export const getCities = async (regionId: number) => {
    try {
        const response = await url.get(`/region/cities/${regionId}`);
        return response.data;
    } catch (error) {
        console.error('시/군 목록 조회 에러:', error);
        throw error;
    }
};

export const getTowns = async (cityId: number) => {
    try {
        const response = await url.get(`/region/towns/${cityId}`);
        return response.data;
    } catch (error) {
        console.error('읍/면/동 목록 조회 에러:', error);
        throw error;
    }
};


export const getUserRegion = async () => {
    try {
        const response = await url.get('/region/', {
            headers: {
                'Authorization': getToken()
            }
        });
        return response;
    } catch (error) {
        console.log('사용자 지역 조회 에러:', error);
        throw error;
    }
};

export const setUserRegion = async (cityId: number) => {
    try {
        const response = await url.post('/region/select', {
            cityId: cityId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        });
        alert('지역 설정 성공: ' + response.data);
        return response.data;
    } catch (error) {
        console.error('지역 설정 에러:', error);
        throw error;
    }
};