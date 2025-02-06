import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name:string, value:string, dasy:number = 1) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + dasy);
    return cookies.set(name, value,{path:'/'});
}

export const getCookie = (name:string) => {
    return cookies.get(name);
}

export const deleteCookie = (name:string, path = "/") => {
    cookies.remove(name,{path});
}