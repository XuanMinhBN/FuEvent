import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Event from './event';
import EventDetail from './event-detail';
import EventUpdate from './event-update';
import EventDeleteDialog from './event-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const EventRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="new"
          element={
            <ErrorBoundary>
              <EventUpdate />
            </ErrorBoundary>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ErrorBoundary>
              <EventUpdate />
            </ErrorBoundary>
          }
        />
        <Route
          path=":id"
          element={
            <ErrorBoundary>
              <EventDetail />
            </ErrorBoundary>
          }
        />
        <Route
          index
          element={
            <ErrorBoundary>
              <Event />
            </ErrorBoundary>
          }
        />
        <Route
          path=":id/delete"
          element={
            <ErrorBoundary>
              <EventDeleteDialog />
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
};
