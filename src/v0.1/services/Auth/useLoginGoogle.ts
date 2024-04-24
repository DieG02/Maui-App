import MauiApi from '../../clientProvider/axiosConfig';
import { useMutation, UseMutationOptions } from 'react-query';
import { IAuthGoogle, IAuthGoogleInput } from '../../types/types';

export const LOGIN_GOOGLE_KEY = 'LOGIN_GOOGLE_KEY';

export const googleLogin = async (data: IAuthGoogleInput) => {
  const response = await MauiApi.post('/google-login', data);
  return response.data;
};

const useLoginGoogle = (
  options?: UseMutationOptions<
    IAuthGoogle,
    Error,
    {
      data: IAuthGoogleInput;
    },
    [typeof LOGIN_GOOGLE_KEY]
  >
) => useMutation([LOGIN_GOOGLE_KEY], (params: { data: IAuthGoogleInput }) => googleLogin(params.data), { ...options });

export default useLoginGoogle;
