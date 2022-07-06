import MauiApi from "../clientProvider";
import {
  getTransactionsQueryParamsDto,
  getTransactionsResponseDto,
} from "../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../../utils";

export const getTransactions = async (
  queryParams?: getTransactionsQueryParamsDto
) => {
  return MauiApi.get<getTransactionsResponseDto>("/getTransactions", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
    params: queryParams,
  }).then((res) => res.data);
};

export type getPeriodTransactionsResponseDto = {
  items: getTransactionsResponseDto;
  date: string;
}[];

export const getDailyTransactions = async () => {
  return MauiApi.get<getPeriodTransactionsResponseDto>(
    "/getDailyTransactions",
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);
};

export const getWeeklyTransactions = async () => {
  return MauiApi.get<getPeriodTransactionsResponseDto>(
    "/getWeeklyTransactions",
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);
};

export const getMonthlyTransactions = async () => {
  return MauiApi.get<getPeriodTransactionsResponseDto>(
    "/getMonthlyTransactions",
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);
};

export const getYearlyTransactions = async () => {
  return MauiApi.get<getPeriodTransactionsResponseDto>(
    "/getYearlyTransactions",
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);
};
