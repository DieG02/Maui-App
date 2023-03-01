import MauiApi from "../clientProvider";
import { getUserAuthenticationHeader } from "../requests";

export const getAllIncomeDebts = async () => {
  return await MauiApi.get("/getAllIncomeDebts/", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
}

export const getIncomeDebtById = async (id: string) => {
  if (!id) return
  return await MauiApi.get<IncomeData>("/getIncomeDebt/" + id, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
}

export const getAllExpenseDebts = async () =>
  await MauiApi.get("/getAllExpenseDebts/", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);


export const getAllExpenses = async () =>
  await MauiApi.get("/getAllExpenses/", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const getExpenseById = async (id: string) => {
  if (!id) return
  return await MauiApi.get<ExpenseData>("/getExpenseDebt/" + id, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data)
}