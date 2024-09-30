//@ts-ignore
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getUserAuthenticationHeader } from '../requests';
import { VERIFY_TOKEN } from '../services/Account/useVerifyToken';
import { GET_SUBSCRIPTION_CAPABILITIES_KEY } from '../services/SuscriptionCapabilities/useGetCapabilities';
import { queryClient } from '../utils/queryClient';

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
      queryClient.invalidateQueries(GET_SUBSCRIPTION_CAPABILITIES_KEY);
      queryClient.invalidateQueries(VERIFY_TOKEN);
      return { data: null };
    }

    return Promise.reject(error);
  }
);

export const setHeaders = async (): Promise<void> => {
  const authHeader = await getUserAuthenticationHeader();
  instance.defaults.headers.common.Authorization = authHeader;
};

export default instance;
