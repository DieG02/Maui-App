import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.0.15:5000/v1/",
  baseURL: "https://api-maui-2022.herokuapp.com/v1/",
});

export default instance;
