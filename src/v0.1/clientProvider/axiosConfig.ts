import axios from 'axios';
import { API_URL } from '@env';

import { getUserAuthenticationHeader } from '../requests';

const instance = axios.create({
  baseURL: API_URL,
});

console.log('URL', API_URL);

export const setHeaders = async (): Promise<void> => {
  const authHeader = await getUserAuthenticationHeader();

  instance.defaults.headers.common.Authorization = authHeader;
};

export default instance;
