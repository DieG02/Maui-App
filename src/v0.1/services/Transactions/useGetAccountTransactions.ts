import { useState } from 'react';
import { useQuery, QueryKey } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IQueryTransaction, ITransactionDetail } from '../../types/types';

export const GET_ACCOUNT_TRANSACTIONS_KEY = 'GET_ACCOUNT_TRANSACTIONS_KEY';

export const getAccountTransactions = async (accountId: string, queryParams?: IQueryTransaction) => {
  await setHeaders();
  const response = await MauiApi.get<ITransactionDetail[]>(`/transactions/account/${accountId}`, {
    params: queryParams,
  });
  return response.data;
};

const useGetAccountTransactions = (accountId: string, initialQueryParams?: IQueryTransaction) => {
  const [queryParams, setQueryParams] = useState(initialQueryParams);

  const { data, refetch } = useQuery([GET_ACCOUNT_TRANSACTIONS_KEY, accountId, queryParams] as QueryKey, () =>
    getAccountTransactions(accountId, queryParams)
  );

  const handleRefetch = (newQueryParams?: IQueryTransaction) => {
    setQueryParams(newQueryParams || queryParams);
    refetch();
  };

  return { data, refetch: handleRefetch };
};

export default useGetAccountTransactions;
