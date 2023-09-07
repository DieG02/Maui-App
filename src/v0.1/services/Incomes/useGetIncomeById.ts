import MauiApi from "../../clientProvider";
import { QueryKey, useQuery } from "react-query";
import { setHeaders } from "../../clientProvider/axiosConfig";

const QUERY_NAME = "IncomeDetail";

export const getIncomeById = async (
    id: string
): Promise<any> => {
    await setHeaders();
    const response = await MauiApi.get<any>(
    `/getIncome/${id}`
    );

    return response.data;
};

const useGetIncomeById = (
    id: string,
    options?: any
) =>
    useQuery(
        [QUERY_NAME] as QueryKey,
        () => getIncomeById(id),
        options
    );

export default useGetIncomeById;