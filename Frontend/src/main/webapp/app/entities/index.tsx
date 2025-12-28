import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserProfile from './user-profile';
import { EventRoutes } from './fueventapi/event';
import { OrderRoutes } from './fueventapi/order';
import { OrderItemRoutes } from './fueventapi/order-item';
import { PaymentRoutes } from './fueventapi/payment';
import { ProductRoutes } from './fueventapi/product';
import { CategoryRoutes } from './fueventapi/category';
import { ReviewRoutes } from './fueventapi/review';
import { DiscountRoutes } from './fueventapi/discount';
import { NotificationRoutes } from './fueventapi/notification';
import { WalletRoutes } from './fueventapi/wallet';
import { OrderDiscountRoutes } from './fueventapi/order-discount';
import { TransactionHistoryRoutes } from './fueventapi/transaction-history';
import ErrorBoundary from 'app/shared/error/error-boundary';
/* jhipster-needle-add-route-import - JHipster will add routes here */
export const EntityRoutes = () => (
  <div>
    <Routes>
      {/* prettier-ignore */}
      {/* Cần thêm '/*' để cho phép các sub-routes bên trong hoạt động */}
      <Route
        path="event/*"
        element={
          <ErrorBoundary>
            <EventRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="order/*"
        element={
          <ErrorBoundary>
            <OrderRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="order-item/*"
        element={
          <ErrorBoundary>
            <OrderItemRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="payment/*"
        element={
          <ErrorBoundary>
            <PaymentRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="product/*"
        element={
          <ErrorBoundary>
            <ProductRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="category/*"
        element={
          <ErrorBoundary>
            <CategoryRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="review/*"
        element={
          <ErrorBoundary>
            <ReviewRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="discount/*"
        element={
          <ErrorBoundary>
            <DiscountRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="notification/*"
        element={
          <ErrorBoundary>
            <NotificationRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="wallet/*"
        element={
          <ErrorBoundary>
            <WalletRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="order-discount/*"
        element={
          <ErrorBoundary>
            <OrderDiscountRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="transaction-history/*"
        element={
          <ErrorBoundary>
            <TransactionHistoryRoutes />
          </ErrorBoundary>
        }
      />
      <Route
        path="user-profile/*"
        element={
          <ErrorBoundary>
            <UserProfile />
          </ErrorBoundary>
        }
      />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Routes>
  </div>
);
