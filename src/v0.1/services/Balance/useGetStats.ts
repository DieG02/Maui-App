import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { IMontlyStats } from '../../types/types';

export const GET_MONTHLY_STATS_KEY = 'GET_MONTHLY_STATS_KEY';

export const getMonthlyMainStats = async () => {
  await setHeaders();
  const response = await MauiApi.get<IMontlyStats>('/monthly-stats');
  return response.data;
};

const useGetMonthlyStats = (options?: UseQueryOptions<IMontlyStats>) =>
  useQuery([GET_MONTHLY_STATS_KEY] as QueryKey, getMonthlyMainStats, options);
export default useGetMonthlyStats;
