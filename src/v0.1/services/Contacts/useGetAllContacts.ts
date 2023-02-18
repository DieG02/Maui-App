import MauiApi from "../../clientProvider";
import { getAllContactsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";

const QUERY_NAME = "Contacts";

export const getAllContacts = async () => {
  await setHeaders();
  const response = await MauiApi.get<getAllContactsResponseDto>(
    "/getAllContacts/"
  );
  return response.data;
};

const useGetAllContacts = (options?: UseQueryOptions) =>
  useQuery([QUERY_NAME] as QueryKey, getAllContacts, options);
export default useGetAllContacts;
