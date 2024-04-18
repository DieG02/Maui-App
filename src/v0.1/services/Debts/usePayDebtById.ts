import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseMutationOptions, useMutation } from 'react-query';
import { IPayDebtInput } from '../../types/types';

export const PAY_DEBT_KEY = 'PAY_DEBT_KEY';

export const payDebtById = async (data: IPayDebtInput, id: string) => {
  await setHeaders();
  const response = await MauiApi.post<IPayDebtInput>('/pay-debt/' + id, data);
  return response.data;
};

const usePayDebtById = (data: IPayDebtInput, id: string, options?: UseMutationOptions) =>
  useMutation([PAY_DEBT_KEY] as QueryKey, () => payDebtById(data, id), options);
export default usePayDebtById;
