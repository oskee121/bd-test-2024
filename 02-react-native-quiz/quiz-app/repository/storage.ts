import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getDataFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
    return undefined;
  } catch (e) {
    // error reading value
  }
};
