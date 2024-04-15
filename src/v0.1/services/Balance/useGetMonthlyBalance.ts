import MauiApi from '../../clientProvider';
import { MonthlyBalanceResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, useQuery } from 'react-query';

const QUERY_NAME = 'Monthly_Balance';

export const getMonthlyBalance = async () => {
  await setHeaders();
  const response = await MauiApi.get<MonthlyBalanceResponseDto>('/monthly-balance');
  return response.data;
};

const useGetMonthlyBalance = () => useQuery([QUERY_NAME] as QueryKey, getMonthlyBalance);
export default useGetMonthlyBalance;
