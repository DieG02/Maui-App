import MauiApi from '../../clientProvider';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ICurrency } from '../../types/types';

export const GET_CURRENCIES_KEY = 'GET_CURRENCIES_KEY';

export const getCurrencies = async () => {
  const response = await MauiApi.get<ICurrency[]>(`/currencies`);
  return response.data;
};

const useGetCurrencies = (options?: UseQueryOptions<ICurrency[]>) =>
  useQuery([GET_CURRENCIES_KEY] as QueryKey, () => getCurrencies(), options);
export default useGetCurrencies;
