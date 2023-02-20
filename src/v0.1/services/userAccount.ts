import MauiApi from "../clientProvider";
import {
  createNewAccountBodyInputDto,
  createNewAccountResponseDto,
  getUserAccountByIdResponseDto,
  editUserAccountBodyInputDto,
  editUserAccountResponseDto,
} from "../../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../requests";

export const getTransactions = async (data: createNewAccountBodyInputDto) => {
  return MauiApi.post<createNewAccountResponseDto>("/getTransactions", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
};

export const getUserAccount = async () => {
  return MauiApi.get<getUserAccountByIdResponseDto>("/getUserAccountById", {
    headers: {
      Authorization : await getUserAuthenticationHeader(),
    },
  }).then((res)=>res.data)
}

export const editUserAccount = async (data: editUserAccountBodyInputDto) => {
  return MauiApi.put<editUserAccountResponseDto>("/editUserAccount", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res)=>res.data);
};