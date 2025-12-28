import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Settings from './settings/settings';
import Password from './password/password';
import ErrorBoundary from 'app/shared/error/error-boundary';

const AccountRoutes = () => (
  <div>
    <Routes>
      <Route
        path="settings"
        element={
          <ErrorBoundary>
            <Settings />
          </ErrorBoundary>
        }
      />
      <Route
        path="password"
        element={
          <ErrorBoundary>
            <Password />
          </ErrorBoundary>
        }
      />
    </Routes>
  </div>
);

export default AccountRoutes;
