import MauiApi from '../../clientProvider';
import { getCountryCodesResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { QueryKey, useQuery } from 'react-query';

export const QUERY_NAME = 'CountryCode';

export const getCountryCode = async () => {
  const response = await MauiApi.get<getCountryCodesResponseDto>(`/country-codes`);
  return response.data;
};

const useGetCountryCode = () => useQuery([QUERY_NAME] as QueryKey, () => getCountryCode());
export default useGetCountryCode;
