import { QueryKey, UseMutationOptions, useMutation } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';

export const DELETE_ACCOUNT_KEY = 'DELETE_ACCOUNT_KEY';

export const deleteAccount = async () => {
  await setHeaders();
  const response = await MauiApi.delete('/unsubscribe');
  return response.data;
};

const useDeleteAccount = (options?: UseMutationOptions) =>
  useMutation([DELETE_ACCOUNT_KEY] as QueryKey, () => deleteAccount(), options);

export default useDeleteAccount;
