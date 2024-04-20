import { UseMutationOptions, useMutation } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IAccount, IAccountInput } from '../../types/types';

export const PUT_ACCOUNT_KEY = 'PUT_ACCOUNT_KEY';

export const putAccount = async (data: IAccountInput) => {
  await setHeaders();
  const response = await MauiApi.put<IAccount>('/user-account/', data);
  return response.data;
};

const usePutAccount = (
  options?: UseMutationOptions<
    IAccount,
    Error,
    {
      data: IAccountInput;
    },
    [typeof PUT_ACCOUNT_KEY]
  >
) =>
  useMutation([PUT_ACCOUNT_KEY], (params: { data: IAccountInput }) => putAccount(params.data), {
    ...options,
  });

export default usePutAccount;
