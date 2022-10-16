import MauiApi from "../clientProvider";
import {
  createContactBodyInputDto,
  createContactResponseDto,
  editContactBodyInputDto,
  editContactResponseDto,
  getAllContactsResponseDto,
  getContactByIdResponseDto,
} from "../../../Maui-Backend/src/controllers/types";
import { getUserAuthenticationHeader } from "../../utils";

export const createNewContact = async (data: createContactBodyInputDto) =>
  await MauiApi.post<createContactResponseDto>("/createNewContact", data, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const getAllContacts = async () =>
  await MauiApi.get<getAllContactsResponseDto>("/getAllContacts/", {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const getContactById = async (contactId: string) =>
  await MauiApi.get<getContactByIdResponseDto>("/getContactById/" + contactId, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const deleteContactById = async (contactId: string) =>
  await MauiApi.delete("/deleteContact/" + contactId, {
    headers: {
      Authorization: await getUserAuthenticationHeader(),
    },
  }).then((res) => res.data);

export const updateContactById = async (
  contactId: string,
  data: editContactBodyInputDto
) =>
  await MauiApi.patch<editContactResponseDto>(
    "/editContact/" + contactId,
    data,
    {
      headers: {
        Authorization: await getUserAuthenticationHeader(),
      },
    }
  ).then((res) => res.data);
