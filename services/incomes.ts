import MauiApi from "../clientProvider";
import {
  createIncomeBodyInputDto,
  createIncomeResponseDto,
  editIncomeBodyInputDto,
  editIncomeResponseDto
} from "../../Maui-Backend/src/controllers/types";

export const createNewIncome = async (data: createIncomeBodyInputDto) =>
  await MauiApi.post<createIncomeResponseDto>("/createNewIncome", data).then(
    (res) => res.data
  );

export const editIncome = async (
  incomeId: string,
  data: editIncomeBodyInputDto
) =>
  await MauiApi.patch<editIncomeResponseDto>(
    "/editIncome/" + incomeId,
    data
  ).then((res) => res.data);

export const deleteIncome = async (incomeId: string) =>
  await MauiApi.delete("/deleteIncome/" + incomeId).then((res) => res.data);
