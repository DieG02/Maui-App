import MauiApi from '../../clientProvider';

import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IQueryTransaction, ITransactionDetail } from '../../types/types';

export const GET_TRANSACTIONS_KEY = 'GET_TRANSACTIONS_KEY';

export const getTransactions = async (queryParams?: IQueryTransaction) => {
  await setHeaders();
  const response = await MauiApi.get<ITransactionDetail[]>('/transactions', { params: queryParams });

  return response.data;
};

const useGetAllTransactions = (queryParams?: IQueryTransaction, options?: UseQueryOptions<ITransactionDetail[]>) =>
  useQuery([GET_TRANSACTIONS_KEY, queryParams] as QueryKey, () => getTransactions(queryParams), options);

export default useGetAllTransactions;
