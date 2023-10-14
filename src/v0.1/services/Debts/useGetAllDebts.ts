import MauiApi from '../../clientProvider';
import { getAllDebtsResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

const QUERY_NAME = 'Debts';

export const getAllDebts = async () => {
  await setHeaders();
  const response = await MauiApi.get<getAllDebtsResponseDto>('/getAllDebts');
  return response.data;
};

const useGetAllDebts = (options?: UseQueryOptions<getAllDebtsResponseDto>) =>
  useQuery([QUERY_NAME] as QueryKey, () => getAllDebts(), options);
export default useGetAllDebts;
