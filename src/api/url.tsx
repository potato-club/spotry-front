import axios from "axios";

const url = axios.create({
  baseURL: "http://sportry.site",
});

export default url;
