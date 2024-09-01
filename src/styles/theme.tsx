import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    whiteButtonLoginProvider: true;
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  
  },
  colorSchemes: {
    dark: true,
  },
});

theme = createTheme(theme, {
  palette: {
    whiteButtonLoginProvider: theme.palette.augmentColor({
      color: {
        main: '#fff',
      },
    }),
  },
});



export default theme;