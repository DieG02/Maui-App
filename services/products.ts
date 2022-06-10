import MauiApi from "../clientProvider";
import {
  createNewProductBodyInputDto,
  createNewProductResponseDto,
  getAllProductsResponseDto,
  getProductByIdResponseDto
} from "../../Maui-Backend/src/controllers/types";

export const createNewProduct = async (data: createNewProductBodyInputDto) =>
  MauiApi.post<createNewProductResponseDto>("/createNewProduct", data).then(
    (res) => res.data
  );

export const getAllProducts = async () =>
  MauiApi.get<getAllProductsResponseDto>("/getAllProducts").then(
    (res) => res.data
  );

export const getProductById = async (productId: string) =>
  MauiApi.get<getProductByIdResponseDto>("/getProductById/" + productId).then(
    (res) => res.data
  );
