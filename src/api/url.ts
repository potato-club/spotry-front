import axios from "axios";

const BASE_URL = "https://sportry.site";

const url = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default url;
