import MauiApi from "../clientProvider";
import {
  createServiceBodyInputDto,
  createServiceResponseDto,
} from "../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../../utils";

export const createNewService = async (data: createServiceBodyInputDto) =>
  MauiApi.post<createServiceResponseDto>("/createService", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);
