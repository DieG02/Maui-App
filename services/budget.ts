import MauiApi from "../clientProvider";
import {
  createBudgetBodyInputDto,
  createBudgetResponseDto,
  getBudgetByIdResponseDto
} from "../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../utils";

export const createNewBudget = async (data: createBudgetBodyInputDto) =>
  await MauiApi.post<createBudgetResponseDto>("/createNewBudget", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    }
  }).then((res) => res.data);

export const getBudget = async (budgetId: string) =>
  await MauiApi.get<getBudgetByIdResponseDto>("/getBudget/" + budgetId, {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    }
  }).then((res) => res.data);
