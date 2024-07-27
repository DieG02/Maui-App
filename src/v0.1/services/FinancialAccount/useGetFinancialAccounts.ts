import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { IBalance } from '../../types/types';

export const GET_FINANCIAL_ACCOUNT_KEY = 'GET_FINANCIAL_ACCOUNT_KEY';

export const getFinancialAccount = async () => {
  await setHeaders();
  const response = await MauiApi.get<IBalance>('/financial-account');
  return response.data;
};

const useGetFinancialAccount = (options?: UseQueryOptions<IBalance>) =>
  useQuery([GET_FINANCIAL_ACCOUNT_KEY] as QueryKey, getFinancialAccount, options);
export default useGetFinancialAccount;
