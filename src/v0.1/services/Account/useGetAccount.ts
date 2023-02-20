import MauiApi from "../../clientProvider";
import { getUserAccountByIdResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useQuery } from "react-query";

const QUERY_NAME = "Account";

export const getUserAccount = async () => {
  await setHeaders();
  const response = await MauiApi.get<getUserAccountByIdResponseDto>(
    "/getUserAccountById"
  );
  return response.data;
};

const useGetAccount = () => useQuery([QUERY_NAME] as QueryKey, getUserAccount);
export default useGetAccount;
