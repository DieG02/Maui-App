import { useQuery } from "react-query"
import MauiApi from "../../clientProvider"
import { getUserAuthenticationHeader } from "../../requests"

const getAllExpenseDebts = async () =>
    await MauiApi.get<ExpenseDebt[]>("/getAllExpenseDebts/", {
        headers: {
            Authorization: await getUserAuthenticationHeader(),
        },
    }).then((res) => res.data)

const useGetExpenseDebts = () => useQuery("expenseDebts", getAllExpenseDebts)

export default useGetExpenseDebts;