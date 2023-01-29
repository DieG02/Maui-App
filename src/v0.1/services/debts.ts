import MauiApi from "../clientProvider";
import {
  createIncomeBodyInputDto,
  createIncomeResponseDto,
} from "../../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../requests";

export const createNewIncome = async (data: createIncomeBodyInputDto) =>
  await MauiApi.post<createIncomeResponseDto>("/createNewIncome", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);


export const deleteIncome = async (incomeId: string) =>
  await MauiApi.delete("/deleteIncome/" + incomeId, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const getAllIncome = async () =>
  await MauiApi.get("/getAllIncomeDebts/", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const getAllExpense = async () =>
  await MauiApi.get("/getAllExpenseDebts/", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);



export const income = {
    id: "1",
    name: "Danilo Bautista",
    purchases: "",
    sales: "1",
    price: "$1100",
    date: "12 de junio",
  }
  
export const expense = {
    id: "2",
    name: "Diego Bautista",
    purchases: "2",
    sales: "",
    price: "1400",
    date: "14 de Diciembre",
  }