import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { IMonthlyBalance } from '../../types/types';

export const GET_MONTHLY_BALANCE_KEY = 'GET_MONTHLY_BALANCE_KEY';

export const getMonthlyBalance = async () => {
  await setHeaders();
  const response = await MauiApi.get<IMonthlyBalance>('/monthly-balance');
  return response.data;
};

const useGetMonthlyBalance = (options?: UseQueryOptions<IMonthlyBalance>) =>
  useQuery([GET_MONTHLY_BALANCE_KEY] as QueryKey, getMonthlyBalance, options);
export default useGetMonthlyBalance;
