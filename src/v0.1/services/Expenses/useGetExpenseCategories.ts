import MauiApi from "../../clientProvider";
import { getExpenseCategoriesResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { QueryKey, useQuery } from "react-query";

const QUERY_NAME = "Expense_Categories";

export const getExpenseCategories = async () => {
  const response = await MauiApi.get<getExpenseCategoriesResponseDto>(
    "/getExpenseCategories"
  );
  return response.data;
};

const useGetExpenseCategories = () =>
  useQuery([QUERY_NAME] as QueryKey, getExpenseCategories);
export default useGetExpenseCategories;
