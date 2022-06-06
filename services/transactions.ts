import MauiApi from "../clientProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createIncomeBodyInputDto,
  createIncomeResponseDto,
} from "../../Maui-Backend/src/controllers/types";

export const addIncome = async (data: createIncomeBodyInputDto) => {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";
  const id = user ? JSON.parse(user).id : "";

  return await MauiApi.post<createIncomeResponseDto>(
    "/createNewIncome",
    {
      ...data,
      id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const addExpense = async (data: Object) => {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";
  const id = user ? JSON.parse(user).id : "";
  return await MauiApi.post(
    "/createNewExpense",
    {
      ...data,
      id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const lastTransactions = async () => {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";
  const data = await MauiApi.get("/getTransactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      fromDate: "2022-04-26T21:45:42.003Z",
      toDate: new Date().toISOString(),
    },
  });

  return data;
};

export const getBalance = async () => {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";
  const { data: balance } = await MauiApi.get<number>("/getMyBalance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      fromDate: "2022-04-26T21:45:42.003Z",
      toDate: new Date().toISOString(),
    },
  });

  return balance;
};
