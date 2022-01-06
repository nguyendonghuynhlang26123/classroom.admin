import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';

type ThemeCtxProps = {
  children: any;
  themeConfig: any;
};

export const ThemeContext = ({ children, themeConfig }: ThemeCtxProps) => {
  const theme = createTheme(themeConfig);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
