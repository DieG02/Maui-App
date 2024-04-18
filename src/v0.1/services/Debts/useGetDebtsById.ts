import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { IDebtor } from '../../types/types';

export const GET_DEBT_KEY = 'GET_DEBT_KEY';

export const getDebtById = async (debtorId: string) => {
  await setHeaders();
  const response = await MauiApi.get<IDebtor>(`/debts/${debtorId}`);
  return response.data;
};

const useGetDebtById = (debtorId: string, options?: UseQueryOptions<IDebtor>) =>
  useQuery([GET_DEBT_KEY, debtorId] as QueryKey, () => getDebtById(debtorId), options);
export default useGetDebtById;
