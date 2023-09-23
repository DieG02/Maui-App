import MauiApi from '../../clientProvider';
import {
  createTransactionBodyInputDto,
  createTransactionBodyInputGuard,
} from '../../../../../Maui-Backend/src/controllers/types';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { useMutation, UseMutationOptions } from 'react-query';

const QUERY_NAME = 'Create_Income';

export const createTransaction = async (data: createTransactionBodyInputDto) => {
  await setHeaders();
  const response = await MauiApi.post<createTransactionBodyInputGuard>('/createTransaction', data);
  return response.data;
};

const useCreateTransaction = (data: any, options?: UseMutationOptions) =>
  useMutation([QUERY_NAME], () => createTransaction(data), options);

export default useCreateTransaction;
