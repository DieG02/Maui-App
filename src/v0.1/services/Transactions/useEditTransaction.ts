import MauiApi from "../../clientProvider";
import { editExpenseResponseDto, editExpenseBodyInputDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { useMutation, UseMutationOptions } from "react-query";

const QUERY_NAME = "Edit_Transaction"

export const editTransaction = async (transactionId: string, data: editExpenseBodyInputDto) => {

    await setHeaders();
    const response = await MauiApi.patch<editExpenseResponseDto>(
        '/editTransaction/' + transactionId, data
    );
    return response.data
}

const useEditTransaction = (transactionId: string, data: any, options?: UseMutationOptions) =>

    useMutation([QUERY_NAME], () => editTransaction(transactionId, data), options);

export default useEditTransaction;