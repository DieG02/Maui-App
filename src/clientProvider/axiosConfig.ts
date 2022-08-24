import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-maui-2022.herokuapp.com/v1/",
  // baseURL: "https://api-maui.vercel.app/v1/",
});

export default instance;
