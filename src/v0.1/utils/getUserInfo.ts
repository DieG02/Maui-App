import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocaleFromAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('userInfo');
    if (value !== null) {
      const { locale } = JSON.parse(value);
      return locale;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};
