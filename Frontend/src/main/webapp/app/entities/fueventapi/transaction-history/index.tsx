import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TransactionHistory from './transaction-history';
import TransactionHistoryDetail from './transaction-history-detail';
import TransactionHistoryUpdate from './transaction-history-update';
import TransactionHistoryDeleteDialog from './transaction-history-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const TransactionHistoryRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <TransactionHistoryUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <TransactionHistoryUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <TransactionHistoryDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <TransactionHistoryDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <TransactionHistory />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
