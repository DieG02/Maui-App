import MauiApi from "../clientProvider";
import {
  createExpenseBodyInputDto,
  createExpenseResponseDto,
  editExpenseBodyInputDto,
  editExpenseResponseDto,
} from "../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../../utils";

export const createNewExpense = async (data: createExpenseBodyInputDto) =>
  await MauiApi.post<createExpenseResponseDto>("/createNewExpense", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const editExpense = async (
  expenseId: string,
  data: editExpenseBodyInputDto
) =>
  await MauiApi.patch<editExpenseResponseDto>(
    "/editExpense/" + expenseId,
    data,
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);

export const deleteExpense = async (expenseId: string) =>
  await MauiApi.delete("/deleteExpense/" + expenseId, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
