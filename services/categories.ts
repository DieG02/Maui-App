import MauiApi from "../clientProvider";

export const getAllCategories = async () => {
  const { data } = await MauiApi.get("/getAllCategories");
  return data.data;
};

export const getExpenseCategories = async () => {
  const { data } = await MauiApi.get("/getExpenseCategories");
  return data;
};
