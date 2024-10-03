import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import MauiApi from '../../clientProvider';
import { ILink } from '../../types/types';

export const GET_LINKS_KEY = 'GET_LINKS_KEY';

export const getLinks = async () => {
  const response = await MauiApi.get<ILink[]>('/links');
  return response.data;
};

const useGetLinks = (options?: UseQueryOptions<ILink[]>) => useQuery([GET_LINKS_KEY] as QueryKey, getLinks, options);
export default useGetLinks;
