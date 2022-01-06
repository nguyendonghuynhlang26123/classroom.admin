import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/index.css';
import { CssBaseline } from '@mui/material';

import { Provider } from 'react-redux';
import { store } from './store';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from 'components';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CssBaseline />
        <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
