import url from "./url";

export const fetchRegion = async() => {
    try {
        const response = await url.get('/region/');
        return response.data;
    } catch (error) {
        console.error('에러입니다 : ',error);
        throw error;
    }
};

export const fetchCities = async(id:number) => {
    try {
        const response = await url.get(`/region/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error('city 에러입니다 : ',error);
        throw error;
    }
}

export const fetchtowns = async(id:number) => {
    try {
        const response = await url.get(`/region/twons/${id}`);
        return response.data;
    } catch (error) {
        console.error('twons 에러입니다 : ',error);
        throw error;
    }
}
