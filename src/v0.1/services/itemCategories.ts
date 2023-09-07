import { getUserAuthenticationHeader } from "../requests";

import MauiApi from "../clientProvider";

import {
  createOneProductCategoryInputDto,
  createOneProductCategoryResponseDto,
  getAllProductsCategoriesResponseDto,
} from "../../../../Maui-Backend/src/controllers/types";

export const createNewItemCategory = async (
  data: createOneProductCategoryInputDto
) =>
  await MauiApi.post<createOneProductCategoryResponseDto>(
    "/createOneProductCategory",
    data,
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);

export const getItemCategories = async () => {
  return MauiApi.get<getAllProductsCategoriesResponseDto>(
    "/allProductCategories",
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);
};
