import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Wallet from './wallet';
import WalletDetail from './wallet-detail';
import WalletUpdate from './wallet-update';
import WalletDeleteDialog from './wallet-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const WalletRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <WalletUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <WalletUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <WalletDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <WalletDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <Wallet />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
