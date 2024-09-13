import MauiApi from '../../clientProvider';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IBalance } from '../../types/types';

export const GET_ALL_ACCOUNTS_KEY = 'GET_ALL_ACCOUNTS_KEY';

export const getAllAccounts = async (): Promise<IBalance> => {
  await setHeaders();
  const response = await MauiApi.get<IBalance>('/financial-account');
  return response.data;
};

const useGetAllAccounts = (options?: UseQueryOptions<IBalance>) =>
  useQuery([GET_ALL_ACCOUNTS_KEY] as QueryKey, getAllAccounts, options);
export default useGetAllAccounts;
