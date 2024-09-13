import MauiApi from '../../clientProvider';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { ITransactionDetail } from '../../types/types';

export const GET_ACCOUNT_TRANSACTIONS_KEY = 'GET_ACCOUNT_TRANSACTIONS_KEY';

export const getAccountTransactions = async (accountId: string): Promise<ITransactionDetail[]> => {
  await setHeaders();
  const response = await MauiApi.get<ITransactionDetail[]>(`/transactions/account/${accountId}`);
  return response.data;
};

const useGetAccountTransactions = (accountId: string, options?: UseQueryOptions<ITransactionDetail[]>) =>
  useQuery([GET_ACCOUNT_TRANSACTIONS_KEY, accountId] as QueryKey, () => getAccountTransactions(accountId), {
    ...options,
  });

export default useGetAccountTransactions;
