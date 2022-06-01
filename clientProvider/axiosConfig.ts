import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.15:5000/v1/",
});

export default instance;
