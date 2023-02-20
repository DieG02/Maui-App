import MauiApi from "../../clientProvider";
import { getMonthlyMainStatsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useQuery } from "react-query";

const QUERY_NAME = "Monthly_Stats";

export const getMonthlyMainStats = async () => {
  await setHeaders();
  const response = await MauiApi.get<getMonthlyMainStatsResponseDto>(
    "/getMonthlyMainStats"
  );
  return response.data;
};

const useGetMonthlyStats = () =>
  useQuery([QUERY_NAME] as QueryKey, getMonthlyMainStats);
export default useGetMonthlyStats;
