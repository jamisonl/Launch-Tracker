import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import {blue, green, blueGrey} from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blueGrey[700],
      dark: blue[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

function createPageContext() {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  if (!process.browser) {
    return createPageContext();
  }
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }
  return global.__INIT_MATERIAL_UI__;
}