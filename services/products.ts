import MauiApi from "../clientProvider";
import {
  createNewProductBodyInputDto,
  createNewProductResponseDto,
  getAllProductsResponseDto,
  getProductByIdResponseDto,
  searchProductsByNameQueryParamsDto,
  searchProductsByNameResponseDto,
  getProductsByCategoryResponseDto,
  GetProductsByCategoryQueryParamsDto
} from "../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../utils";

export const createNewProduct = async (data: createNewProductBodyInputDto) =>
  MauiApi.post<createNewProductResponseDto>("/createNewProduct", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    }
  }).then((res) => res.data);

export const getAllProducts = async () =>
  MauiApi.get<getAllProductsResponseDto>("/getAllProducts", {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    }
  }).then((res) => res.data);

export const getProductById = async (productId: string) =>
  MauiApi.get<getProductByIdResponseDto>("/getProductById/" + productId, {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    }
  }).then((res) => res.data);

export const searchProductsByName = async (
  queryParams: searchProductsByNameQueryParamsDto
) =>
  MauiApi.get<searchProductsByNameResponseDto>("/searchProductsByName/", {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    },
    params: queryParams
  }).then((res) => res.data);

export const getProductsByCategory = async (
  queryParams: GetProductsByCategoryQueryParamsDto
) =>
  MauiApi.get<getProductsByCategoryResponseDto>("/getProductsByCategory/", {
    headers: {
      Authorization: await getUserAuthenticationHeader()
    },
    params: queryParams
  }).then((res) => res.data);
