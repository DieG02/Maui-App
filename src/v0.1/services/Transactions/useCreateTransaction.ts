import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { useMutation, UseMutationOptions } from 'react-query';
import { ITransaction, ITransactionInput } from '../../types/types';

export const CREATE_TRANSACTION_KEY = 'CREATE_TRANSACTION_KEY';

export const createTransaction = async (data: ITransactionInput) => {
  await setHeaders();
  const response = await MauiApi.post<ITransaction>('/transactions', data);
  return response.data;
};

const useCreateTransaction = (data: ITransactionInput, options?: UseMutationOptions<ITransaction>) =>
  useMutation([CREATE_TRANSACTION_KEY], () => createTransaction(data), options);

export default useCreateTransaction;
