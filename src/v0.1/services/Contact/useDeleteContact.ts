import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, UseMutationOptions, useMutation } from 'react-query';

const QUERY_NAME = 'Delete_Contact';

export const deleteContact = async (contactId: string) => {
  await setHeaders();
  const response = await MauiApi.delete(`/deleteContact/${contactId}`);
  return response.data;
};

const useDeleteContact = (contactId: string, options: UseMutationOptions) =>
  useMutation([QUERY_NAME, contactId] as QueryKey, () => deleteContact(contactId), options);
export default useDeleteContact;
