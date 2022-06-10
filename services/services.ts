import MauiApi from "../clientProvider";
import {
  createServiceBodyInputDto,
  createServiceResponseDto
} from "../../Maui-Backend/src/controllers/types";

export const createNewService = (data: createServiceBodyInputDto) =>
  MauiApi.post<createServiceResponseDto>("/createService", data).then(
    (res) => res.data
  );
