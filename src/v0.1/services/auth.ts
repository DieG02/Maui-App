import MauiApi from "../clientProvider";
import {
  signInInputBodyDto,
  signInResponseDto,
  signUpInputBodyDto,
  signUpResponseDto,
} from "../../../../Maui-Backend/src/controllers/types";

export const signIn = async (data: signInInputBodyDto) =>
  await MauiApi.post<signInResponseDto>("/signIn", data).then(
    (res) => res.data
  );

export const signUp = async (data: signUpInputBodyDto) =>
  await MauiApi.post<signUpResponseDto>("/signUp", data).then(
    (res) => res.data
  );
