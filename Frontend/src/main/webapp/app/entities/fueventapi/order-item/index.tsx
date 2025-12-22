import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderItem from './order-item';
import OrderItemDetail from './order-item-detail';
import OrderItemUpdate from './order-item-update';
import OrderItemDeleteDialog from './order-item-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const OrderItemRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <OrderItemUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <OrderItemUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <OrderItemDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <OrderItemDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <OrderItem />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
