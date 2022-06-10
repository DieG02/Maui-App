import MauiApi from "../clientProvider";
import {
  createContactBodyInputDto,
  createContactResponseDto,
  getAllContactsResponseDto,
  getContactByIdResponseDto
} from "../../Maui-Backend/src/controllers/types";

export const createNewContact = async (data: createContactBodyInputDto) =>
  await MauiApi.post<createContactResponseDto>("/createNewContact").then(
    (res) => res.data
  );

export const getAllContacts = async () =>
  await MauiApi.get<getAllContactsResponseDto>("/getAllContacts/").then(
    (res) => res.data
  );

export const getContactById = async (contactId: string) =>
  await MauiApi.get<getContactByIdResponseDto>(
    "/getContactById/" + contactId
  ).then((res) => res.data);
