import MauiApi from '../../clientProvider';
import { getByDebtorIdResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

const QUERY_NAME = 'Debt';

export const getDebtById = async (debtorId: string) => {
  await setHeaders();
  const response = await MauiApi.get<getByDebtorIdResponseDto>(`/getDebtById/${debtorId}`);
  return response.data;
};

const useGetDebtById = (debtorId: string, options?: UseQueryOptions<getByDebtorIdResponseDto>) =>
  useQuery([QUERY_NAME, debtorId] as QueryKey, () => getDebtById(debtorId), options);
export default useGetDebtById;
