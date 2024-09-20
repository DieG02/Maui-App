import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { useMutation, UseMutationOptions } from 'react-query';
import { IFinancialAccountEditInput, IFinancialAccount } from '../../types/types';

export const PUT_FINANCIAL_ACCOUNT_KEY = 'PUT_FINANCIAL_ACCOUNT_KEY';

export const editFinancialAccount = async (accountId: string, data: IFinancialAccountEditInput) => {
  await setHeaders();
  const response = await MauiApi.put<IFinancialAccount>(`/financial-account/${accountId}`, data);
  return response.data;
};

const useEditFinancialAccount = (
  accountId: string,
  data: IFinancialAccountEditInput,
  options?: UseMutationOptions<IFinancialAccount>
) => useMutation([PUT_FINANCIAL_ACCOUNT_KEY], () => editFinancialAccount(accountId, data), options);

export default useEditFinancialAccount;
