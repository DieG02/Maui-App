import MauiApi from '../../clientProvider';
import { getTransactionsResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';

const QUERY_NAME = 'Transactions';

export const getTransactions = async (): Promise<getTransactionsResponseDto> => {
  await setHeaders();
  const response = await MauiApi.get<getTransactionsResponseDto>('/getTransactions');

  return response.data;
};

const useGetTransactions = (options?: UseQueryOptions<getTransactionsResponseDto>) =>
  useQuery([QUERY_NAME] as QueryKey, () => getTransactions(), options);

export default useGetTransactions;
