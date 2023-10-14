import { QueryKey, useMutation } from 'react-query';
import { UseMutationOptions } from 'react-query';
import { setHeaders } from '../../clientProvider/axiosConfig';
import MauiApi from "../../clientProvider";

const QUERY_KEY = "deleteTransaction";

export const deleteTransaction = async (transactionId: string) => {
    await setHeaders();
    const response = await MauiApi.delete("/deleteTransaction/" + transactionId)
    return response.data;
}

const useDeleteTransaction = (transactionId: string, options?: UseMutationOptions) => useMutation([QUERY_KEY, transactionId] as QueryKey, () => deleteTransaction(transactionId), options)
export default useDeleteTransaction