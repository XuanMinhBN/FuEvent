import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserManagement from './user-management';
import UserManagementDetail from './user-management-detail';
import UserManagementUpdate from './user-management-update';
import UserManagementDeleteDialog from './user-management-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const UserManagementRoutes = () => (
  <Routes>
    <Route
      path="new"
      element={
        <ErrorBoundary>
          <UserManagementUpdate />
        </ErrorBoundary>
      }
    />
    <Route
      path=":login/edit"
      element={
        <ErrorBoundary>
          <UserManagementUpdate />
        </ErrorBoundary>
      }
    />
    <Route
      path=":login"
      element={
        <ErrorBoundary>
          <UserManagementDetail />
        </ErrorBoundary>
      }
    />
    <Route
      path=":login/delete"
      element={
        <ErrorBoundary>
          <UserManagementDeleteDialog />
        </ErrorBoundary>
      }
    />
    <Route
      index
      element={
        <ErrorBoundary>
          <UserManagement />
        </ErrorBoundary>
      }
    />
  </Routes>
);
