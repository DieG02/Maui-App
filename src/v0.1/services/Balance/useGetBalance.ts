import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { IBalance } from '../../types/types';

export const GET_BALANCE_KEY = 'GET_BALANCE_KEY';

export const getBalance = async () => {
  await setHeaders();
  const response = await MauiApi.get<IBalance>('/balance');
  return response.data;
};

const useGetBalance = (options?: UseQueryOptions<IBalance>) =>
  useQuery([GET_BALANCE_KEY] as QueryKey, getBalance, options);
export default useGetBalance;
