import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87AB8C', // Fresh sage green
      light: '#A8C5AC',
      dark: '#658869',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7986CB', // Soft purple-blue
      light: '#aab6fe',
      dark: '#49599a',
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