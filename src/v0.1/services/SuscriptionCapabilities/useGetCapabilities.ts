import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';

export const GET_SUBSCRIPTION_CAPABILITIES_KEY = 'GET_SUBSCRIPTION_CAPABILITIES_KEY';

export interface ISubscriptionCapabilities {
  id: string;
  name: string;
  value: JSON;
  limit: number | null;
}

export const getSuscriptionCapabilities = async () => {
  await setHeaders();
  const response = await MauiApi.get<ISubscriptionCapabilities[]>('/subscription-capabilities');
  return response.data;
};

const useGetSuscriptionCapabilities = (options?: UseQueryOptions<ISubscriptionCapabilities[]>) =>
  useQuery([GET_SUBSCRIPTION_CAPABILITIES_KEY] as QueryKey, getSuscriptionCapabilities, options);
export default useGetSuscriptionCapabilities;
