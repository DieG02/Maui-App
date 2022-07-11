import MauiApi from "../clientProvider";
import {
  getExpenseCategoriesResponseDto,
  createExpenseCategoryBodyInputDto,
  createExpenseCategoryResponseDto,
  editExpenseCategoryBodyInputDto,
  editExpenseCategoryResponseDto,
} from "../../../Maui-Backend/src/controllers/types";

export const getExpenseCategories = async () =>
  await MauiApi.get<getExpenseCategoriesResponseDto>(
    "/getExpenseCategories"
  ).then((res) => res.data);

export const createNewExpenseCategories = async (
  data: createExpenseCategoryBodyInputDto
) =>
  await MauiApi.post<createExpenseCategoryResponseDto>(
    "/createNewExpenseCategories",
    data
  ).then((res) => res.data);

export const editExpenseCategory = async (
  expenseCategoryId: string,
  data: editExpenseCategoryBodyInputDto
) =>
  await MauiApi.patch<editExpenseCategoryResponseDto>(
    "/editExpenseCategory/" + expenseCategoryId,
    data
  ).then((res) => res.data);
