import axios from "axios";

export const url = axios.create({
    baseURL: "http://sportry.site",
});