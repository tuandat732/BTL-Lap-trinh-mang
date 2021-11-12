import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = 'theme';

class StorageService {
  public async saveTheme(theme: string) {
    try {
      await AsyncStorage.setItem(THEME, theme);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async getTheme(): Promise<string | null> {
    try {
      const theme = await AsyncStorage.getItem(THEME);
      return theme;
    } catch (e) {
      return null;
    }
  }
}

export const storageService = new StorageService();
