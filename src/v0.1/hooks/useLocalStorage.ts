import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getData("userInfo").then((item) => setUserInfo(item));
  }, []);

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const data = JSON.parse(value);
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  };

  const modifyData = async (key: string, value: string) => {
    const mergedData = {
      ...userInfo,
      [key]: value,
    };
    const body = JSON.stringify(mergedData);
    try {
      storeData("userInfo", body);
    } catch (e) {
      console.error(e);
    }
  };

  return { userInfo, getData, storeData, modifyData };
};

export default useLocalStorage;
