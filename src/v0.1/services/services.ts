import MauiApi from "../clientProvider";
import {
  createServiceBodyInputDto,
  createServiceResponseDto,
} from "../../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../requests";

export const createNewService = async (data: createServiceBodyInputDto) =>
  MauiApi.post<createServiceResponseDto>("/createNewService", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
