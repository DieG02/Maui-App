import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { IBalance } from '../../types/types';

export const GET_TOTAL_BALANCE_KEY = 'GET_TOTAL_BALANCE_KEY';

export const getTotalBalance = async () => {
  await setHeaders();
  const response = await MauiApi.get<IBalance>('/total-balance');
  return response.data;
};

const useGetTotalBalance = (options?: UseQueryOptions<IBalance>) =>
  useQuery([GET_TOTAL_BALANCE_KEY] as QueryKey, getTotalBalance, options);
export default useGetTotalBalance;
