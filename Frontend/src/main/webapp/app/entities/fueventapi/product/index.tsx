import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from './product';
import ProductDetail from './product-detail';
import ProductUpdate from './product-update';
import ProductDeleteDialog from './product-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const ProductRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <ProductUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <ProductUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <ProductDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <ProductDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <Product />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
