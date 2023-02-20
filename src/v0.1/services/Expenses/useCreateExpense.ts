import MauiApi from "../../clientProvider";
import {
  createExpenseBodyInputDto,
  createExpenseResponseDto,
} from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { useMutation, UseMutationOptions } from "react-query";

const QUERY_NAME = "Create_Expense";

export const createNewExpense = async (data: createExpenseBodyInputDto) => {
  await setHeaders();
  const response = await MauiApi.post<createExpenseResponseDto>(
    "/createNewExpense",
    data
  );
  return response.data;
};

const useCreateExpense = (data: any, options?: UseMutationOptions) =>
  useMutation([QUERY_NAME], () => createNewExpense(data), options);

export default useCreateExpense;
