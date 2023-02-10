import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

export const getUserAuthenticationHeader = async (): Promise<string> => {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";
  return `Bearer ${token}`;
};

export const fetchContacts = async () => {
  const contacts = await Contacts.getAll();
  const filteredContacts = contacts
    .filter(
      (contact) =>
        contact.phoneNumbers.length > 0 &&
        (contact.givenName || contact.familyName)
    )
    .map((contact) => ({
      id: contact.recordID,
      name: contact.displayName,
      phone: contact.phoneNumbers[0]?.number,
    }))
    .sort((a, b) => {
      const n = a.name
        .toLocaleLowerCase()
        .localeCompare(b.name.toLocaleLowerCase());
      return n === 0 && a.name !== b.name ? b.name.localeCompare(a.name) : n;
    });
  return filteredContacts;
};

export const checkPermission = async () => {
  try {
    const checked = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    return checked;
  } catch (err) {
    console.warn(err);
  }
};
export const requestContactPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    return granted;
  } catch (err) {
    console.warn(err);
  }
};
