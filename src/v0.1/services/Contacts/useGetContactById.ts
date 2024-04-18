import MauiApi from '../../clientProvider';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { IContact } from '../../types/types';

export const GET_CONTACT_KEY = 'GET_CONTACT_KEY';

export const getContactById = async (contactId: string): Promise<IContact> => {
  await setHeaders();
  const response = await MauiApi.get<IContact>(`/contacts/${contactId}`);
  return response.data;
};

const useGetContactById = (contactId: string, options?: UseQueryOptions<IContact>) =>
  useQuery([GET_CONTACT_KEY, contactId] as QueryKey, () => getContactById(contactId), {
    ...options,
  });
export default useGetContactById;
