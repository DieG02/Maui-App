import MauiApi from "../../clientProvider";
import {
  createIncomeBodyInputDto,
  createIncomeResponseDto,
} from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { useMutation, UseMutationOptions } from "react-query";

const QUERY_NAME = "Create_Income";

export const createNewIncome = async (data: createIncomeBodyInputDto) => {
  await setHeaders();
  const response = await MauiApi.post<createIncomeResponseDto>(
    "/createNewIncome",
    data
  );
  return response.data;
};

const useCreateIncome = (data: any, options?: UseMutationOptions) =>
  useMutation([QUERY_NAME], () => createNewIncome(data), options);

export default useCreateIncome;
