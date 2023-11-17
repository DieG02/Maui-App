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
    const requestOnceAvailable = await AsyncStorage.getItem('read_contacts_requested');
    if(!requestOnceAvailable) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      await AsyncStorage.setItem('read_contacts_requested', JSON.stringify(true));
      if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
      else return false;
    }
    return null;
    
  } catch (err) {
    console.warn(err);
    return false;
  }

};

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    return granted;
  } catch (err) {
    console.warn(err);
  }
};

export const checkCameraPermission = async () => {
  try {
    const checked = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    return checked;
  } catch (err) {
    console.warn(err);
  }
};