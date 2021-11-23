import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = 'theme';
const TOKEN = 'token';

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

  public async saveToken(token: string) {
    try {
      await AsyncStorage.setItem(TOKEN, token);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN);
      return token;
    } catch (e) {
      return null;
    }
  }

  public async destroyToken() {
    try {
      const token = await AsyncStorage.removeItem(TOKEN);
      return token;
    } catch (e) {
      return null;
    }
  }
}

export const storageService = new StorageService();
