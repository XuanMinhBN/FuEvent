import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Payment from './payment';
import PaymentDetail from './payment-detail';
import PaymentUpdate from './payment-update';
import PaymentDeleteDialog from './payment-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const PaymentRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <PaymentUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <PaymentUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <PaymentDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <PaymentDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <Payment />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
