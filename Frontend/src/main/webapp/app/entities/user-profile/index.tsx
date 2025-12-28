import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './user-profile';
import UserProfileDetail from './user-profile-detail';
import UserProfileUpdate from './user-profile-update';
import UserProfileDeleteDialog from './user-profile-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

const UserProfileRoutes = () => (
  <Routes>
    <Route
      path="new"
      element={
        <ErrorBoundary>
          <UserProfileUpdate />
        </ErrorBoundary>
      }
    />
    <Route
      path=":id/edit"
      element={
        <ErrorBoundary>
          <UserProfileUpdate />
        </ErrorBoundary>
      }
    />
    <Route
      path=":id"
      element={
        <ErrorBoundary>
          <UserProfileDetail />
        </ErrorBoundary>
      }
    />
    {/* Route xóa (Lưu ý: Trong v6, route này sẽ hiển thị ở trang riêng biệt 
        trừ khi bạn cấu hình Nested Routes để hiển thị dạng Modal) */}
    <Route
      path=":id/delete"
      element={
        <ErrorBoundary>
          <UserProfileDeleteDialog />
        </ErrorBoundary>
      }
    />
    <Route
      index
      element={
        <ErrorBoundary>
          <UserProfile />
        </ErrorBoundary>
      }
    />
  </Routes>
);

export default UserProfileRoutes;
