import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Discount from './discount';
import DiscountDetail from './discount-detail';
import DiscountUpdate from './discount-update';
import DiscountDeleteDialog from './discount-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const DiscountRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/new"
          element={
            <ErrorBoundary>
              <DiscountUpdate />
            </ErrorBoundary>
          }
        />
        <Route
          index
          path="/:id/edit"
          element={
            <ErrorBoundary>
              <DiscountUpdate />
            </ErrorBoundary>
          }
        />
        <Route
          index
          path="/:id"
          element={
            <ErrorBoundary>
              <DiscountDetail />
            </ErrorBoundary>
          }
        />
        <Route
          index
          element={
            <ErrorBoundary>
              <Discount />
            </ErrorBoundary>
          }
        />
      </Routes>
      <Route
        index
        path="/:id/delete"
        element={
          <ErrorBoundary>
            <DiscountDeleteDialog />
          </ErrorBoundary>
        }
      />
    </>
  );
};
