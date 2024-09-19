import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { IMonthlyBalance } from '../../types/types';

export const GET_MONTHLY_BALANCE_KEY = 'GET_MONTHLY_BALANCE_KEY';

export const getMonthlyBalance = async (accountId: string): Promise<IMonthlyBalance> => {
  await setHeaders();
  const response = await MauiApi.get<IMonthlyBalance>(`/monthly-balance/${accountId}`);
  return response.data;
};

const useGetMonthlyBalance = (accountId: string, options?: UseQueryOptions<IMonthlyBalance>) =>
  useQuery([GET_MONTHLY_BALANCE_KEY, accountId] as QueryKey, () => getMonthlyBalance(accountId), {
    ...options,
  });

export default useGetMonthlyBalance;
