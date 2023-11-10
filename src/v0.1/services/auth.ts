import MauiApi from "../clientProvider";
import {
  signInInputBodyDto,
  signInResponseDto,
  signUpInputBodyDto,
  signUpResponseDto,
  unsubscribeResponseDto,
} from "../../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../requests";

export const signIn = async (data: signInInputBodyDto) =>
  await MauiApi.post<signInResponseDto>("/signIn", data).then(
    (res) => res.data
  );

export const signUp = async (data: signUpInputBodyDto) =>
  await MauiApi.post<signUpResponseDto>("/signUp", data).then(
    (res) => res.data
  );

export const unsubscribe = async () => {
  return MauiApi.delete<unsubscribeResponseDto>("/unsubscribe", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res)=>res.data);
};