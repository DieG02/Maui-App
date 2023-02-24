import MauiApi from "../../clientProvider";
import { editIncomeResponseDto, editIncomeBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useMutation, UseMutationOptions } from "react-query";

const QUERY_NAME="editIncome"

  export const editIncome = async (incomeId:string, data:editIncomeBodyInputDto) => {
  await setHeaders();
  const response = await MauiApi.post<editIncomeResponseDto>(`/editIncome/${incomeId}`, data);
  return response.data
}

const useEditIncome = (incomeId:string, data: any, options?: UseMutationOptions) => useMutation([QUERY_NAME] as QueryKey, () => editIncome(incomeId, data), options)
export default useEditIncome;