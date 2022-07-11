import MauiApi from "../clientProvider";
import {
  createNewAccountBodyInputDto,
  createNewAccountResponseDto,
} from "../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../../utils";

export const getTransactions = async (data: createNewAccountBodyInputDto) => {
  return MauiApi.post<createNewAccountResponseDto>("/getTransactions", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
};
