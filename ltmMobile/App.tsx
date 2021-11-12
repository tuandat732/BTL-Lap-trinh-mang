import React, {useEffect, useState} from 'react';
import {NetProvider} from './src/context/net.context';
import {NavigationContainer} from '@react-navigation/native';
import {storageService} from './src/services/storage.service';
import {Theme, themes} from './src/styles/themes';
import {ThemeContext} from './src/context/theme.context';
import {MainNavigation} from './src/navigations/main.navigation';
import {ThemeProvider} from './src/styles/styled-component';
import {navigationService} from './src/services/navigation.service';

const App = () => {
  const [theme, setTheme] = useState(themes.white);

  useEffect(() => {
    getThemeInLocal();
  }, []);

  const getThemeInLocal = async () => {
    const themeLocal = await storageService.getTheme();
    if (themeLocal) {
      switch (themeLocal) {
        case Theme.WHITE:
          setTheme(themes.white);
          break;
        case Theme.DARK:
          setTheme(themes.dark);
          break;
        default:
          setTheme(themes.white);
      }
    } else {
      await storageService.saveTheme(Theme.WHITE);
    }
  };

  const toggleTheme = async () => {
    const themeLocal = await storageService.getTheme();
    const nextTheme =
      (themeLocal as string) === Theme.WHITE ? Theme.DARK : Theme.WHITE;
    setTheme(themes[nextTheme]);
    storageService.saveTheme(nextTheme);
  };

  return (
    <NavigationContainer
      ref={navigationService.navigationRef}
      onReady={() => {
        // Mark as app mounted
        navigationService.setIsReadyNavigation(true);
      }}>
      <ThemeContext.Provider
        value={{
          theme: theme,
          toggleTheme: toggleTheme,
        }}>
        <ThemeProvider theme={theme}>
          <NetProvider>
            <MainNavigation />
          </NetProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
};

export default App;
