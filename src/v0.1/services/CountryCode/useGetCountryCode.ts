import MauiApi from '../../clientProvider';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ICountryCode } from '../../types/types';

export const GET_COUNTRY_CODE_KEY = 'GET_COUNTRY_CODE_KEY';

export const getCountryCode = async () => {
  const response = await MauiApi.get<ICountryCode[]>(`/country-codes`);
  return response.data;
};

const useGetCountryCode = (options?: UseQueryOptions<ICountryCode[]>) =>
  useQuery([GET_COUNTRY_CODE_KEY] as QueryKey, () => getCountryCode(), options);
export default useGetCountryCode;
