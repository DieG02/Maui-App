import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-maui-2022.herokuapp.com/v1/",
});

export default instance;
