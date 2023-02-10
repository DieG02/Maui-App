import MauiApi from "../../clientProvider";
import { getBalanceResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useQuery } from "react-query";

const QUERY_NAME = "Balance";

export const getBalance = async () => {
  await setHeaders();
  const response = await MauiApi.get<getBalanceResponseDto>("/getMyBalance");
  return response.data;
};

const useGetBalance = () => useQuery([QUERY_NAME] as QueryKey, getBalance);
export default useGetBalance;
