import MauiApi from "../../clientProvider"
import { setHeaders } from "../../clientProvider/axiosConfig"
import { useMutation } from "react-query"
import { queryClient } from "../../utils/queryClient"

const payIncomeDebt = async (data: Payments) => {
    await setHeaders()
    await MauiApi.post<void>(`/payIncomeDebt/${data.id}`, data)
}

const usePayIncomeDebt = (id: string) => {
    return useMutation(['payIncome', id],
        payIncomeDebt,
        {
            onSuccess() {
                queryClient.invalidateQueries(["incomeData", id])
                queryClient.invalidateQueries("CloseModel")
            }
        }
    )
}

export default usePayIncomeDebt;