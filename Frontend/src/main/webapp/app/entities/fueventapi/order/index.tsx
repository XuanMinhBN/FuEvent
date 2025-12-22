import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Order from './order';
import OrderDetail from './order-detail';
import OrderUpdate from './order-update';
import OrderDeleteDialog from './order-delete-dialog';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const OrderRoutes = () => {
  return (
    <Routes>
      <Route
        path="new"
        element={
          <ErrorBoundary>
            <OrderUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id/edit"
        element={
          <ErrorBoundary>
            <OrderUpdate />
          </ErrorBoundary>
        }
      />
      <Route
        path=":id"
        element={
          <ErrorBoundary>
            <OrderDetail />
          </ErrorBoundary>
        }
      />
      {/* path: /order/:id/delete 
          Lưu ý: Trong v6, route này sẽ hiển thị trang Delete riêng biệt.
          Nếu muốn hiển thị dạng Modal đè lên trang danh sách, bạn cần cấu hình Outlet trong component Order.
      */}
      <Route
        path=":id/delete"
        element={
          <ErrorBoundary>
            <OrderDeleteDialog />
          </ErrorBoundary>
        }
      />
      <Route
        index
        element={
          <ErrorBoundary>
            <Order />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};
