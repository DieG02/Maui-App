import MauiApi from "../clientProvider";
import {
  getBalanceResponseDto,
  GetMovementsQueryParamsDto,
  getMovementsResponseDto,
  getMonthlyMainStatsResponseDto
} from "../../Maui-Backend/src/controllers/types";

export const getBalance = async () =>
  await MauiApi.get<getBalanceResponseDto>("/getMyBalance").then(
    (res) => res.data
  );

export const getMovements = async (query: GetMovementsQueryParamsDto) =>
  MauiApi.get<getMovementsResponseDto>("/signin", {
    params: query
  }).then((res) => res.data);

export const getMonthlyMainStats = async () =>
  await MauiApi.get<getMonthlyMainStatsResponseDto>(
    "/getMonthlyMainStats"
  ).then((res) => res.data);
