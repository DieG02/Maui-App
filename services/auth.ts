import AsyncStorage from "@react-native-async-storage/async-storage";
import MauiApi from "../clientProvider";

export const signIn = async (res: Object) => {
  try {
    const { data } = await MauiApi.post("/signin", res);
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (res: Object) => {
  try {
    const { data } = await MauiApi.post("/signup", res);
    return data;
  } catch (error) {
    throw error;
  }
};
