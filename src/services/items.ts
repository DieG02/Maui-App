import MauiApi from "../clientProvider";
import { getAllItemsResponseDto } from "../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../../utils";

export const getAllItem = async () =>
  MauiApi.get<getAllItemsResponseDto>("/getAllItems", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
