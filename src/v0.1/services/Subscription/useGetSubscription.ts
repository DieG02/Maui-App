import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';

export const GET_SUBSCRIPTION_KEY = 'GET_SUBSCRIPTION_KEY';

export interface ISubscription {
  id: string;
  type: string;
  enabled: boolean;
}

export const getSubscription = async () => {
  await setHeaders();
  const response = await MauiApi.get<ISubscription>('/subscription');
  return response.data;
};

const useGetSubscription = (options?: UseQueryOptions<ISubscription>) =>
  useQuery([GET_SUBSCRIPTION_KEY] as QueryKey, getSubscription, options);
export default useGetSubscription;
