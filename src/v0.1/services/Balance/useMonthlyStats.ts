import MauiApi from '../../clientProvider';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IMontlyStats } from '../../types/types';

export const GET_MONTHLY_STATS_KEY = 'GET_MONTHLY_STATS_KEY';

export const getMonthlyMainStats = async (accountId?: string) => {
  await setHeaders();
  const url = accountId ? `/monthly-stats/${accountId}` : '/monthly-stats';
  const response = await MauiApi.get<IMontlyStats>(url);
  return response.data;
};

const useGetMonthlyStats = (accountId?: string, options?: UseQueryOptions<IMontlyStats>) =>
  useQuery([GET_MONTHLY_STATS_KEY, accountId] as QueryKey, () => getMonthlyMainStats(accountId), options);

export default useGetMonthlyStats;
