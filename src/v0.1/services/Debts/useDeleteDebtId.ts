import { QueryKey, useMutation } from 'react-query';
import { UseMutationOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import MauiApi from '../../clientProvider';

export const DELETE_DEBT_KEY = 'DELETE_DEBT_KEY';

export const deleteDebt = async (debtId: string) => {
  await setHeaders();
  const response = await MauiApi.delete('/debts/' + debtId);
  return response.data;
};

const useDeleteDebt = (debtId: string, options?: UseMutationOptions) =>
  useMutation([DELETE_DEBT_KEY, debtId] as QueryKey, () => deleteDebt(debtId), options);
export default useDeleteDebt;
