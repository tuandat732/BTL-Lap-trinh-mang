import {DefaultTheme} from 'styled-components/native';

export enum Theme {
  WHITE = 'white',
  DARK = 'dark',
}

export const themes: {
  white: DefaultTheme;
  dark: DefaultTheme;
} = {
  white: {
    bgColor: '#f8f9fa',
    cardColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.103)',
    blurColor: 'rgba(255, 255, 255, 0.8)',
    textColor: 'black',
    primaryColor: '',
    secondaryColor: '',
  },
  dark: {
    bgColor: '#404447',
    cardColor: '#303437',
    shadowColor: '#1b1b1b88',
    blurColor: 'rgba(75, 75, 75, 0.8)',
    textColor: 'white',
    primaryColor: '',
    secondaryColor: '',
  },
};
