import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Review from './review';
import ReviewDetail from './review-detail';
import ReviewUpdate from './review-update';
import ReviewDeleteDialog from './review-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const ReviewRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <ReviewUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <ReviewUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <ReviewDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <ReviewDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <Review />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
