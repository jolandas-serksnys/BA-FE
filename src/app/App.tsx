import { AuthProvider } from '@src/contexts/authContext';
import { queryClient } from '@src/utils/queryClient';
import React from 'react';
import { hot } from 'react-hot-loader';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

import '@assets/css/reset.css';
import '@assets/css/opensans.css';
import '@assets/css/overpass.css';
import '@assets/css/style.css';
import '@assets/sass/style.scss';
import { TableProvider } from '@src/contexts/tableContext';
import { AppWrapper } from './App.style';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketProvider } from '@src/contexts/socketContext';
import { Routes } from '@src/routes';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <TableProvider>
            <SocketProvider>
              <AppWrapper>
                <Routes />
              </AppWrapper>
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
            </SocketProvider>
          </TableProvider>
        </AuthProvider>
      </Router>
      {/*<ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default hot(module)(App);
