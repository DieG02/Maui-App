import axios from "axios";

const instance = axios.create({
  // baseURL: "https://maui.fly.dev/v1/",
  baseURL: "https://api-maui.up.railway.app/v1",
});

export default instance;
