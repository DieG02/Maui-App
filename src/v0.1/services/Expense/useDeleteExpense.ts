import MauiApi from "../../clientProvider";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useMutation, UseMutationOptions } from "react-query";

const QUERY_KEY = 'Expense'

export const deleteExpense = async (expenseId: string) => {
  await setHeaders();
  const response = await MauiApi.delete("/deleteExpense/" + expenseId)
  return response.data;
}

const useDeleteExpense = (expenseId: string, options?:UseMutationOptions) => useMutation([QUERY_KEY] as QueryKey, () => deleteExpense(expenseId), options)
export default useDeleteExpense;