import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { API_URL } from '@env';
import { getUserAuthenticationHeader } from '../requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('URL', API_URL);

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const authHeader = await getUserAuthenticationHeader();

  config.headers = config.headers || {};
  config.headers.Authorization = authHeader;

  return config;
});

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('userInfo');
    }

    return Promise.reject(error);
  }
);

export const setHeaders = async (): Promise<void> => {
  const authHeader = await getUserAuthenticationHeader();
  instance.defaults.headers.common.Authorization = authHeader;
};

export default instance;
