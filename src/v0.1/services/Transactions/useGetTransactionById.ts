import MauiApi from '../../clientProvider';
import { getTransactionByIdResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';

const QUERY_NAME = 'Transaction';

export const getTransactionById = async (transactionId: string): Promise<getTransactionByIdResponseDto> => {
  await setHeaders();
  const response = await MauiApi.get<getTransactionByIdResponseDto>(`/getTransactionById/${transactionId}`);
  return response.data;
};

const useGetTransactionById = (transactionId: string, options?: UseQueryOptions<getTransactionByIdResponseDto>) =>
  useQuery([QUERY_NAME, transactionId] as QueryKey, () => getTransactionById(transactionId), {
    ...options,
  });

export default useGetTransactionById;
