import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Category from './category';
import CategoryDetail from './category-detail';
import CategoryUpdate from './category-update';
import CategoryDeleteDialog from './category-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

// const Routes = ({ match }) => (
//   <>
//     <Routes>
//       <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CategoryUpdate} />
//       <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CategoryUpdate} />
//       <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CategoryDetail} />
//       <ErrorBoundaryRoute path={match.url} component={Category} />
//     </Routes>
//     <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CategoryDeleteDialog} />
//   </>
// );

export const CategoryRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <ErrorBoundary>
            <Category />
          </ErrorBoundary>
        }
      />
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <CategoryUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <CategoryUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <CategoryDetail />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <CategoryDeleteDialog />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
