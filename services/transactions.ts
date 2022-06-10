import MauiApi from "../clientProvider";
import {
  getTransactionsQueryParamsDto,
  getTransactionsResponseDto
} from "../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../utils";

export const getTransactions = async (
  queryParams: getTransactionsQueryParamsDto
) => {
  return MauiApi.get<getTransactionsResponseDto>("/getTransactions", {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    },
    params: queryParams
  }).then((res) => res.data);
};
