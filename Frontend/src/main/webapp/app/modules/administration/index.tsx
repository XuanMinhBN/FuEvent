import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserManagementRoutes } from './user-management';
import Logs from './logs/logs';
import Health from './health/health';
import Metrics from './metrics/metrics';
import Configuration from './configuration/configuration';
import Docs from './docs/docs';
import Gateway from './gateway/gateway';
import ErrorBoundary from 'app/shared/error/error-boundary';

const AdminRoutes = () => (
  <div>
    <Routes>
      {/* Cần thêm /* vì UserManagement có chứa các sub-routes bên trong */}
      <Route
        path="user-management/*"
        element={
          <ErrorBoundary>
            <UserManagementRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="gateway"
        element={
          <ErrorBoundary>
            <Gateway />
          </ErrorBoundary>
        }
      />
      <Route
        path="health"
        element={
          <ErrorBoundary>
            <Health />
          </ErrorBoundary>
        }
      />
      <Route
        path="metrics"
        element={
          <ErrorBoundary>
            <Metrics />
          </ErrorBoundary>
        }
      />
      <Route
        path="configuration"
        element={
          <ErrorBoundary>
            <Configuration />
          </ErrorBoundary>
        }
      />
      <Route
        path="logs"
        element={
          <ErrorBoundary>
            <Logs />
          </ErrorBoundary>
        }
      />
      <Route
        path="docs"
        element={
          <ErrorBoundary>
            <Docs />
          </ErrorBoundary>
        }
      />
    </Routes>
  </div>
);

export default AdminRoutes;
