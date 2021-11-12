// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    cardColor: string;
    shadowColor: string;
    blurColor: string;
    textColor: string;
    primaryColor: string;
    secondaryColor: string;
  }
}
