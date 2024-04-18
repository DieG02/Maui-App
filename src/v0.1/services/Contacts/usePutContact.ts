import { UseMutationOptions, useMutation } from 'react-query';
import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IContact, IContactInput } from '../../types/types';

export const PUT_CONTACT_KEY = 'PUT_CONTACT_KEY';

export const putContact = async (id: string, data: IContactInput) => {
  await setHeaders();
  const response = await MauiApi.patch<IContact>('/contacts/' + id, data);
  return response.data;
};

const usePutContact = (
  options?: UseMutationOptions<
    IContact,
    Error,
    {
      id: string;
      data: IContactInput;
    },
    [typeof PUT_CONTACT_KEY]
  >
) =>
  useMutation([PUT_CONTACT_KEY], (params: { id: string; data: IContactInput }) => putContact(params.id, params.data), {
    ...options,
  });

export default usePutContact;
