import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { IAccount } from '../../types/types';

export const GET_ACCOUNT_KEY = 'GET_ACCOUNT_KEY';

export const getUserAccount = async () => {
  await setHeaders();
  const response = await MauiApi.get<IAccount>('/user-account');
  return response.data;
};

const useGetAccount = (options?: UseQueryOptions<IAccount>) =>
  useQuery([GET_ACCOUNT_KEY] as QueryKey, getUserAccount, options);
export default useGetAccount;
