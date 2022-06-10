import MauiApi from "../clientProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createNewAccountBodyInputDto,
  createNewAccountResponseDto
} from "../../Maui-Backend/src/controllers/types";

export const getTransactions = async (data: createNewAccountBodyInputDto) => {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";

  return MauiApi.post<createNewAccountResponseDto>("/getTransactions", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => res.data);
};
