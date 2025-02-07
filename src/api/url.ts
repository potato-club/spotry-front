import axios from "axios";

const BASE_URL = "https://sportry.site"

const url = axios.create({
  baseURL: BASE_URL,
});

const refreshJwt = async (accessToken: any, refreshToken: any) => {
  

}

export default url;
