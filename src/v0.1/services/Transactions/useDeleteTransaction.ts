import { QueryKey, useMutation } from 'react-query';
import { UseMutationOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import MauiApi from '../../clientProvider';

export const DELETE_TRANSACTION_KEY = 'DELETE_TRANSACTION_KEY';

export const deleteTransaction = async (transactionId: string) => {
  await setHeaders();
  const response = await MauiApi.delete('/transactions/' + transactionId);
  return response.data;
};

const useDeleteTransaction = (transactionId: string, options?: UseMutationOptions) =>
  useMutation([DELETE_TRANSACTION_KEY, transactionId] as QueryKey, () => deleteTransaction(transactionId), options);
export default useDeleteTransaction;
