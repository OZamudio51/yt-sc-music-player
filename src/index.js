import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from "@mui/material";
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<ApolloProvider client={client}>
  <ThemeProvider theme={theme}>
  <CssBaseline enableColorScheme />
    <App />
  </ThemeProvider>
</ApolloProvider>
);