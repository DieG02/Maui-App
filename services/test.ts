import axios from "axios";

export const getConsumers = () => {
  return axios.get("https://fakestoreapi.com/users?limit=10");
};
