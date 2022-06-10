import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUserAuthenticationHeader() {
  const user = await AsyncStorage.getItem("userInfo");
  const token = user ? JSON.parse(user).token : "";
  return `Bearer ${token}`;
}
