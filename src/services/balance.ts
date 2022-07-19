import MauiApi from "../clientProvider";
import {
  getBalanceResponseDto,
  GetMovementsQueryParamsDto,
  getMovementsResponseDto,
  getMonthlyMainStatsResponseDto,
} from "../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../../utils";

export const getBalance = async () =>
  await MauiApi.get<getBalanceResponseDto>("/getMyBalance", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const getMovements = async (queryParams: GetMovementsQueryParamsDto) =>
  MauiApi.get<getMovementsResponseDto>("/getMyMovements", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
    params: queryParams,
  }).then((res) => res.data);

export const getMonthlyMainStats = async () =>
  await MauiApi.get<getMonthlyMainStatsResponseDto>("/getMonthlyMainStats", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
