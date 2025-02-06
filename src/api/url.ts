import axios from "axios";

const url = axios.create({
  baseURL: "https://sportry.site",
});

export default url;
