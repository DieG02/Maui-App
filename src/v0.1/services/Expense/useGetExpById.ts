import { useQuery } from "react-query"
import MauiApi from "../../clientProvider"
import { getUserAuthenticationHeader } from "../../requests"

const getExpById = async (id: string) =>
    await MauiApi.get<ExpenseResponse>(`/getExpense/${id}`, {
        headers: {
            Authorization: await getUserAuthenticationHeader(),
        },
    }).then((res) => res.data)

const useGetExpense = (id: string) => useQuery("expenseDetail",
    () => getExpById(id))

export default useGetExpense;