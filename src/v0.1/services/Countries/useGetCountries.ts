import MauiApi from '../../clientProvider';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ICountry } from '../../types/types';

export const GET_COUNTRIES_KEY = 'GET_COUNTRIES_KEY';

export const getCountries = async () => {
  const response = await MauiApi.get<ICountry[]>(`/countries`);
  return response.data;
};

const useGetCountries = (options?: UseQueryOptions<ICountry[]>) =>
  useQuery([GET_COUNTRIES_KEY] as QueryKey, getCountries, options);
export default useGetCountries;
