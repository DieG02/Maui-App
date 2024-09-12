import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IBalance } from '../../types/types';

export const GET_GENERAL_BALANCE_KEY = 'GET_GENERAL_BALANCE_KEY';

export const getGeneralBalance = async () => {
  await setHeaders();
  const response = await MauiApi.get<IBalance>('/balance');
  return response.data;
};

const useGeneralBalance = (options?: UseQueryOptions<IBalance>) =>
  useQuery([GET_GENERAL_BALANCE_KEY] as QueryKey, getGeneralBalance, options);
export default useGeneralBalance;
