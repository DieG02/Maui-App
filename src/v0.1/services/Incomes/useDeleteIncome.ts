import { QueryKey, useMutation } from 'react-query';
import { UseMutationOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import MauiApi from "../../clientProvider";

const QUERY_KEY = "deleteIncome";

export const deleteIncome = async (incomeId: string) =>{
  await setHeaders();
  const response = await MauiApi.delete("/deleteIncome/" + incomeId)
  return response.data;  
}

const useDeleteIncome = (incomeId: string, options?:UseMutationOptions) => useMutation([QUERY_KEY] as QueryKey, () => deleteIncome(incomeId), options)
export default useDeleteIncome