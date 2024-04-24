import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalStorage = () => {
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
      [key]: value,
    };
    const body = JSON.stringify(mergedData);
    try {
      storeData('locale', body);
    } catch (e) {
      console.error(e);
    }
  };

  return { getData, storeData, modifyData };
};

export default useLocalStorage;
