import MauiApi from "../clientProvider";
import {
  createBudgetBodyInputDto,
  createBudgetResponseDto,
  getBudgetByIdResponseDto
} from "../../Maui-Backend/src/controllers/types";

export const createNewBudget = async (data: createBudgetBodyInputDto) =>
  await MauiApi.post<createBudgetResponseDto>("/createNewBudget").then(
    (res) => res.data
  );

export const getBudget = async (budgetId: string) =>
  await MauiApi.get<getBudgetByIdResponseDto>(
    "/getBudget/" + budgetId,
    data
  ).then((res) => res.data);
