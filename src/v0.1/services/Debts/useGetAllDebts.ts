import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { IDebts } from '../../types/types';

export const GET_DEBTS_KEY = 'GET_DEBTS_KEY';

export const getAllDebts = async () => {
  await setHeaders();
  const response = await MauiApi.get<IDebts>('/debts');
  return response.data;
};

const useGetAllDebts = (options?: UseQueryOptions<IDebts>) =>
  useQuery([GET_DEBTS_KEY] as QueryKey, () => getAllDebts(), options);
export default useGetAllDebts;
