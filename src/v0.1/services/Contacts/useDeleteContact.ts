import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseMutationOptions, useMutation } from 'react-query';

export const DELETE_CONTACT_KEY = 'DELETE_CONTACT_KEY';

export const deleteContact = async (contactId: string) => {
  await setHeaders();
  const response = await MauiApi.delete(`/contacts/${contactId}`);
  return response.data;
};

const useDeleteContact = (contactId: string, options: UseMutationOptions) =>
  useMutation([DELETE_CONTACT_KEY, contactId] as QueryKey, () => deleteContact(contactId), options);
export default useDeleteContact;
