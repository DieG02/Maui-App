import MauiApi from '../../clientProvider';
import { getContactByIdResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';

const QUERY_NAME = 'Contact';

export const getContactById = async (contactId: string): Promise<getContactByIdResponseDto> => {
  await setHeaders();
  const response = await MauiApi.get<getContactByIdResponseDto>(`/getContactById/${contactId}`);
  return response.data;
};

const useGetContactById = (contactId: string, options?: UseQueryOptions<getContactByIdResponseDto>) =>
  useQuery([QUERY_NAME, contactId] as QueryKey, () => getContactById(contactId), {
    ...options,
  });
export default useGetContactById;
