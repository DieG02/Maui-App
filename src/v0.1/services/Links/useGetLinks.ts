import MauiApi from '../../clientProvider';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ICountry } from '../../types/types';

export const GET_LINKS_KEY = 'GET_LINKS_KEY';

export const getLinks = async () => {
  const response = await MauiApi.get<ICountry[]>(`/links`);
  return response.data;
};

const useGetLinks = (options?: UseQueryOptions<ICountry[]>) => useQuery([GET_LINKS_KEY] as QueryKey, getLinks, options);
export default useGetLinks;
