import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderDiscount from './order-discount';
import OrderDiscountDetail from './order-discount-detail';
import OrderDiscountUpdate from './order-discount-update';
import OrderDiscountDeleteDialog from './order-discount-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const OrderDiscountRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <OrderDiscountUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <OrderDiscountUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <OrderDiscountDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <OrderDiscountDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <OrderDiscount />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
