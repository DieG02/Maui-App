import MauiApi from '../../clientProvider';
import { setHeaders } from '../../clientProvider/axiosConfig';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { IContact, IContactType } from '../../types/types';

export const GET_CONTACTS_KEY = 'GET_CONTACTS_KEY';

export const getContacts = async (type: IContactType) => {
  await setHeaders();

  const response = await MauiApi.get<IContact[]>('/contacts/', {
    params: {
      type: type,
    },
  });
  return response.data;
};

const useGetAllContacts = (type: IContactType, options?: UseQueryOptions<IContact[]>) =>
  useQuery([GET_CONTACTS_KEY, type] as QueryKey, () => getContacts(type), options);
export default useGetAllContacts;
