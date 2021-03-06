import React from 'react';
import {themes} from '../styles/themes';

export const ThemeContext = React.createContext({
  theme: themes.white,
  toggleTheme: () => {},
});
