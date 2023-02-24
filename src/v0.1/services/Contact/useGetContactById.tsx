import MauiApi from "../../clientProvider";
import { getContactByIdResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useQuery } from "react-query";

  const QUERY_NAME = "Contact";

  export const getContactById = async (contactId: string) => {
    await setHeaders();
    const response = await MauiApi.get<getContactByIdResponseDto>(
      `/getContactById/${contactId}`
    );
    return response.data;
  };

  const useGetContactById = (contactId:string) => useQuery([QUERY_NAME] as QueryKey, () => getContactById(contactId));
  export default useGetContactById;