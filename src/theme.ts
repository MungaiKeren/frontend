import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5722', // Vibrant orange
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#212121', // Deep black
      light: '#484848',
      dark: '#000000',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme; 