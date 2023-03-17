import MauiApi from "../../clientProvider"
import { setHeaders } from "../../clientProvider/axiosConfig"
import { useMutation } from "react-query"
import { queryClient } from "../../utils/queryClient"

const payExpenseDebt = async (data: Payments) => {
    await setHeaders()
    await MauiApi.post<void>(`/payExpenseDebt/${data.id}`, data)
}

const usePayExpenseDebt = (id: string) => {
    return useMutation(['payExpense', id],
        payExpenseDebt,
        {
            onSuccess() {
                queryClient.invalidateQueries(["expense", id])
                queryClient.invalidateQueries("CloseModel")
            }
        }
    )
}

export default usePayExpenseDebt;