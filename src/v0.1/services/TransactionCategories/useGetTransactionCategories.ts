import MauiApi from '../../clientProvider';
import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { ITransactionCategory } from '../../types/types';

const GET_TRANSACTION_CATEGORIES_KEY = 'GET_TRANSACTION_CATEGORIES_KEY';

export const getTransactionCategories = async (type?: string, group?: string) => {
  const response = await MauiApi.get<ITransactionCategory[]>(
    `/transaction-categories?type=${type?.toUpperCase()}&group=${group?.toUpperCase()}`
  );
  return response.data;
};

const useGetTransactionCategories = (
  type?: string,
  group?: string,
  options?: UseQueryOptions<ITransactionCategory[]>
) => useQuery([GET_TRANSACTION_CATEGORIES_KEY] as QueryKey, () => getTransactionCategories(type, group), options);
export default useGetTransactionCategories;
