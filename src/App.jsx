import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from './theme';
import RouteConfig from './route';
import { Toaster } from 'react-hot-toast';

function App() {

  useEffect(() => {
    
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouteConfig></RouteConfig>
        <Toaster></Toaster>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
