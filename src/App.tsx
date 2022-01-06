import { LinearProgress } from '@mui/material';
import { NotificationController } from 'components';
import { mainTheme } from 'configs/theme.config';
import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { ThemeContext, useAuth } from './components/context';
import appRoutes from './pages/route';

function App() {
  const { pathname, search } = useLocation(); // for url params
  const { isAuthenticated, pending } = useAuth();
  const routes = useRoutes(appRoutes(isAuthenticated, search, pathname));

  return (
    <React.Fragment>
      {/* Notification Container */}
      <NotificationController />

      <ThemeContext themeConfig={mainTheme}>{!pending ? routes : <LinearProgress />}</ThemeContext>
    </React.Fragment>
  );
}

export default App;
