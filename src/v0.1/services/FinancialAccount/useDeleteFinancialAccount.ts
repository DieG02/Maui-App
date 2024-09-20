import { QueryKey, useMutation } from 'react-query';
import { UseMutationOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import MauiApi from '../../clientProvider';

export const DELETE_FINANCIAL_ACCOUNT_KEY = 'DELETE_FINANCIAL_ACCOUNT_KEY';

export const deleteFinancialAccount = async (accountId: string) => {
  await setHeaders();
  const response = await MauiApi.delete(`/financial-account/${accountId}`);
  return response.data;
};

const useDeleteFinancialAccount = (accountId: string, options?: UseMutationOptions) =>
  useMutation([DELETE_FINANCIAL_ACCOUNT_KEY, accountId] as QueryKey, () => deleteFinancialAccount(accountId), options);

export default useDeleteFinancialAccount;
