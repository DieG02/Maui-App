import { UseMutationOptions, useMutation } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IContact, IContactInput } from '../../types/types';

export const CREATE_CONTACT_KEY = 'CREATE_CONTACT_KEY';

export const createNewContact = async (data: IContactInput) => {
  await setHeaders();
  const response = await MauiApi.post<IContact>('/contacts', data);
  return response.data;
};

const useCreateContact = (
  options?: UseMutationOptions<
    IContact,
    Error,
    {
      data: IContactInput;
    },
    [typeof CREATE_CONTACT_KEY]
  >
) =>
  useMutation([CREATE_CONTACT_KEY], (params: { data: IContactInput }) => createNewContact(params.data), { ...options });
export default useCreateContact;
