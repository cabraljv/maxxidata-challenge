import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { ptBR } from '@material-ui/data-grid';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './routes';

const theme = createMuiTheme(
  {
    palette: {
      type: 'dark',
      primary: {
        main: teal[500],
        contrastText: '#fff',
      },
    },
    spacing: 0,
  },
  ptBR
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
};

export default App;
