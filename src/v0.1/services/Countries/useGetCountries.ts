import MauiApi from '../../clientProvider';
import { getCountriesResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { QueryKey, useQuery } from 'react-query';

export const QUERY_NAME = 'Countries';

export const getCountries = async () => {
  const response = await MauiApi.get<getCountriesResponseDto>(`/countries`);
  return response.data;
};

const useGetCountries = () => useQuery([QUERY_NAME] as QueryKey, () => getCountries());
export default useGetCountries;
