import MauiApi from "../../clientProvider";
import { editExpenseResponseDto, editExpenseBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { useMutation, UseMutationOptions } from "react-query";

const QUERY_NAME="Edit_Expense"

export const editExpense = async (expenseId:string, data:editExpenseBodyInputDto) => {
  await setHeaders();
    const response = await MauiApi.post<editExpenseResponseDto>(
    '/editExpense/' + expenseId, data
    );
  return response.data
}

const useEditExpense = (expenseId:string, data: any, options?: UseMutationOptions) => 
  useMutation([QUERY_NAME], () => editExpense(expenseId, data), options);

export default useEditExpense;