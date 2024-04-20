import { ITransactionCategory } from '../types/types';

export const getCategoryId = (name: string, data?: ITransactionCategory[]) => {
  if (!data) return null;
  const category = data?.find(item => item.name === name);
  return category ? category.id : null;
};

export const getCategoryName = (id: string, data?: ITransactionCategory[]) => {
  if (!data) return null;
  const category = data?.find(item => item.id === id);
  return category ? category.name : null;
};
