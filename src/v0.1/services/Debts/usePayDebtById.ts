import MauiApi from '../../clientProvider';
import { payDebtBodyInputDto, payDebtBodyInputGuard } from '../../../../../Maui-Backend/src/controllers/types';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseMutationOptions, useMutation } from 'react-query';

const QUERY_NAME = 'Pay_Debt_By_Id';

export const payDebtById = async (data: payDebtBodyInputDto) => {
  await setHeaders();
  const response = await MauiApi.post<payDebtBodyInputGuard>('/payDebtById', data);
  return response.data;
};

const usePayDebtById = (data: any, options?: UseMutationOptions) =>
  useMutation([QUERY_NAME] as QueryKey, () => payDebtById(data), options);
export default usePayDebtById;
