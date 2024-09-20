import { UseMutationOptions, useMutation } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IFinancialAccountInput, IFinancialAccount } from '../../types/types';

export const CREATE_FINANCIAL_ACCOUNT_KEY = 'CREATE_FINANCIAL_ACCOUNT_KEY';

export const createNewFinancialAccount = async (data: IFinancialAccountInput) => {
  await setHeaders();
  const response = await MauiApi.post<any>('/new-financial-account', data);
  return response.data;
};

const useCreateFinancialAccount = (
  options?: UseMutationOptions<IFinancialAccount, Error, { data: any }, [typeof CREATE_FINANCIAL_ACCOUNT_KEY]>
) =>
  useMutation([CREATE_FINANCIAL_ACCOUNT_KEY], (params: { data: any }) => createNewFinancialAccount(params.data), {
    ...options,
  });
export default useCreateFinancialAccount;
