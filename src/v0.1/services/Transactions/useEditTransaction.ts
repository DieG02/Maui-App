import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { useMutation, UseMutationOptions } from 'react-query';
import { ITransactionInput, ITransaction } from '../../types/types';

export const PUT_TRANSACTION_KEY = 'PUT_TRANSACTION_KEY';

export const editTransaction = async (transactionId: string, data: ITransactionInput) => {
  await setHeaders();
  const response = await MauiApi.patch<ITransaction>('/transactions/' + transactionId, data);
  return response.data;
};

const useEditTransaction = (
  transactionId: string,
  data: ITransactionInput,
  options?: UseMutationOptions<ITransaction>
) => useMutation([PUT_TRANSACTION_KEY], () => editTransaction(transactionId, data), options);

export default useEditTransaction;
