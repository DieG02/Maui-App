import MauiApi from "../../clientProvider";
import { getAllContactsResponseDto } from "../../../../../Maui-Backend/src/controllers/types";
import { setHeaders } from "../../clientProvider/axiosConfig";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";

type ContactType = "provider" | "client"

const QUERY_NAME = "Contacts";

export const getAllContacts = async (type?: ContactType) => {
  await setHeaders();
  let url = "/getAllContacts/";
  if (type) {
    url += `?type=${type.toUpperCase()}`;
  }
  const response = await MauiApi.get<getAllContactsResponseDto>(url);
  return response.data;
};

const useGetAllContacts = (
  type?: ContactType,
  options?: UseQueryOptions<getAllContactsResponseDto>
) => useQuery([QUERY_NAME, type] as QueryKey, () => getAllContacts(type), options);
export default useGetAllContacts;
