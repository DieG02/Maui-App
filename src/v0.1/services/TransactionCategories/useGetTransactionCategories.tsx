import MauiApi from '../../clientProvider';
import { getExpenseCategoriesResponseDto } from '../../../../../Maui-Backend/src/controllers/types';
import { QueryKey, useQuery } from 'react-query';

const QUERY_NAME = 'Transaction_Categories';

export const getTransactionCategories = async (type?: string, group?: string) => {
  const response = await MauiApi.get<getExpenseCategoriesResponseDto>(
    `/getTransactionCategories?type=${type?.toUpperCase()}&group=${group?.toUpperCase()}`
  );
  return response.data;
};

const useGetTransactionCategories = (type?: string, group?: string) =>
  useQuery([QUERY_NAME] as QueryKey, () => getTransactionCategories(type, group));
export default useGetTransactionCategories;
