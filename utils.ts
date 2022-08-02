import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

export async function getUserAuthenticationHeader() {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";
  return `Bearer ${token}`;
}

export const getReadContacts = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const contacts = await Contacts.getAll();
      const contactsList = contacts
        .map((contact) => ({
          id: contact.recordID,
          name: contact.displayName,
          phone: contact.phoneNumbers[0]?.number,
        }))
        .filter((contact) => contact.phone !== undefined)
        .sort((a, b) => {
          const n = a.name
            .toLocaleLowerCase()
            .localeCompare(b.name.toLocaleLowerCase());
          return n === 0 && a.name !== b.name
            ? b.name.localeCompare(a.name)
            : n;
        });

      console.log("contactsList", contactsList);
      return contactsList;
    } else {
      console.log("Contacts permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
