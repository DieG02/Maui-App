import { useQuery } from "react-query"
import MauiApi from "../../clientProvider"
import { getUserAuthenticationHeader } from "../../requests"

const getAllIncomeDebts = async () => {
    return await MauiApi.get<IncomeDebt[]>("/getAllIncomeDebts/", {
        headers: {
            Authorization: await getUserAuthenticationHeader(),
        },
    }).then((res) => res.data);
}

const useGetIncomeDebts = () => useQuery("incomes", getAllIncomeDebts)

export default useGetIncomeDebts;