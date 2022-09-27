import axios from "axios";

const instance = axios.create({
  baseURL: "https://maui.fly.dev/v1/",
});

export default instance;
