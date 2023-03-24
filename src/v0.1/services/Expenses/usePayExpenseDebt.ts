import MauiApi from "../../clientProvider"
import { setHeaders } from "../../clientProvider/axiosConfig"
import { useMutation } from "react-query"
import { queryClient } from "../../utils/queryClient"
import { showToast } from "../../utils/toast"

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
                showToast('Pagado con exito')
            },
            onError(err: Error) {
                showToast(err.message)
            }
        }
    )
}

export default usePayExpenseDebt;