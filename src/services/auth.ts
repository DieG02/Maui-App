import MauiApi from "../clientProvider";
import {
  signInInputBodyDto,
  signInResponseDto,
  signUpInputBodyDto,
  signUpResponseDto,
} from "../../../Maui-Backend/src/controllers/types";

export const signIn = async (data: signInInputBodyDto) =>
  await MauiApi.post<signInResponseDto>("/signin", data).then(
    (res) => res.data
  );

export const signUp = async (data: signUpInputBodyDto) =>
  await MauiApi.post<signUpResponseDto>("/signup", data).then(
    (res) => res.data
  );
