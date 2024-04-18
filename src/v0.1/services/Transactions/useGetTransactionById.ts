import MauiApi from '../../clientProvider';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { ITransactionDetail } from '../../types/types';

export const GET_TRANSACTION_KEY = 'GET_TRANSACTION_KEY';

export const getTransactionById = async (transactionId: string): Promise<ITransactionDetail> => {
  await setHeaders();
  const response = await MauiApi.get<ITransactionDetail>(`/transactions/${transactionId}`);
  return response.data;
};

const useGetTransactionById = (transactionId: string, options?: UseQueryOptions<ITransactionDetail>) =>
  useQuery([GET_TRANSACTION_KEY, transactionId] as QueryKey, () => getTransactionById(transactionId), {
    ...options,
  });

export default useGetTransactionById;
