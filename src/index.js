import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from "@mui/material";
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<ThemeProvider theme={theme}>
<CssBaseline enableColorScheme />
  <App />
</ThemeProvider>
);