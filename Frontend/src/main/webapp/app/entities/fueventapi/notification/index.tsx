import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Notification from './notification';
import NotificationDetail from './notification-detail';
import NotificationUpdate from './notification-update';
import NotificationDeleteDialog from './notification-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const NotificationRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <NotificationUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <NotificationUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <NotificationDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <NotificationDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <Notification />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
