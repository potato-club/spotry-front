import url from "./url";

export const fetchRegion = async() => {
    try {
        const response = await url.get('/region/region');
        return response.data;
    } catch (error) {
        alert('api 파일에서 에러');
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
        const response = await url.get(`/region/towns/${id}`);
        return response.data;
    } catch (error) {
        console.error('twons 에러입니다 : ',error);
        throw error;
    }
}

export const fetchSelectRegion = async() => {
    try {
        const res = await url.get('/region/');
        return res.data;
    } catch (error) {
        console.log("저장 region 에러 : ",error);
    }
}

// export const PostSelectRegion = async() => {
//     try {
//         const res = await url.post();
//     } catch (error) {
        
//     }
// }