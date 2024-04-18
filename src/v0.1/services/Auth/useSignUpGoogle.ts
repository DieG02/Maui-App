import MauiApi from '../../clientProvider/axiosConfig';
import { useMutation, UseMutationOptions } from 'react-query';
import { ICreateAuthGoogle } from '../../types/types';

export const SIGNUP_GOOGLE_KEY = 'SIGNUP_GOOGLE_KEY';

export const googleSignup = async (data: ICreateAuthGoogle) => {
  const response = await MauiApi.post('/google-signup', data);
  return response.data;
};

const useSignupGoogle = (data: ICreateAuthGoogle, options?: UseMutationOptions) =>
  useMutation([SIGNUP_GOOGLE_KEY], () => googleSignup(data), options);

export default useSignupGoogle;
