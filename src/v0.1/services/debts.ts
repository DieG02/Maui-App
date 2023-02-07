import MauiApi from "../clientProvider";
import { getUserAuthenticationHeader } from "../requests";

export const getAllIncomeDebts = async () => {
  console.log({ token: await getUserAuthenticationHeader() })
  return await MauiApi.get("/getAllIncomeDebts/", {
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