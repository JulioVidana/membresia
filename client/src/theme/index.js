import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import { esES } from '@material-ui/data-grid';

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
      light: colors.grey[400],
      main: colors.grey[600],
      dark: colors.grey[800]
    },
    error: {
      light: colors.red[300],
      main: colors.red[500],
      dark: colors.red[700]
    },
    warning: {
      light: colors.orange[300],
      main: colors.orange[500],
      dark: colors.orange[700]
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
}, esES);

export default theme;
