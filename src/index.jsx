import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';

// Create element for React to render into
const rootElement = document.createElement('div');

// Put that element on the page
document.body.appendChild(rootElement);

// Create React root element to render other React elements into
const root = createRoot(rootElement);

const theme = createTheme({
  palette: {
    mode: 'dark', // light or dark
    background: {
      default: '#32333d',
      paper: '#32333d',
    },
  },
});

// Render React app in the React root element
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
