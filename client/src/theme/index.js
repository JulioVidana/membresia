import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500],
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: colors.grey[600]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      extra: colors.grey[50],
      aviso: colors.red[200]
    }
  },
  shadows,
  typography
});

export default theme;
