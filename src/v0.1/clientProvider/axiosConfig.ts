import axios from "axios";
import { getUserAuthenticationHeader } from "../requests";

const instance = axios.create({
  baseURL: "https://api-maui.up.railway.app/v1",
});

export const setHeaders = async (): Promise<void> => {
  const authHeader = await getUserAuthenticationHeader();
  instance.defaults.headers.common.Authorization = authHeader;
};

export default instance;
