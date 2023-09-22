import MauiApi from '../../clientProvider';
import {
  getTransactionsQueryParamsDto,
  getTransactionsResponseDto,
} from '../../../../../Maui-Backend/src/controllers/types';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';

const QUERY_NAME = 'Transactions';

export const getTransactions = async (
  queryParams?: getTransactionsQueryParamsDto
): Promise<getTransactionsResponseDto> => {
  await setHeaders();
  const response = await MauiApi.get<getTransactionsResponseDto>('/getTransactions', { params: queryParams });

  return response.data;
};

const useGetTransactions = (
  queryParams?: getTransactionsQueryParamsDto,
  options?: UseQueryOptions<getTransactionsResponseDto>
) => useQuery([QUERY_NAME, queryParams] as QueryKey, () => getTransactions(queryParams), options);

export default useGetTransactions;
