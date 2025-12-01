import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserProfile from './user-profile';
import Event from './fueventapi/event';
import Order from './fueventapi/order';
import OrderItem from './fueventapi/order-item';
import Payment from './fueventapi/payment';
import Product from './fueventapi/product';
import Category from './fueventapi/category';
import Review from './fueventapi/review';
import Discount from './fueventapi/discount';
import Notification from './fueventapi/notification';
import Wallet from './fueventapi/wallet';
import OrderDiscount from './fueventapi/order-discount';
import TransactionHistory from './fueventapi/transaction-history';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}event`} component={Event} />
      <ErrorBoundaryRoute path={`${match.url}order`} component={Order} />
      <ErrorBoundaryRoute path={`${match.url}order-item`} component={OrderItem} />
      <ErrorBoundaryRoute path={`${match.url}payment`} component={Payment} />
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}review`} component={Review} />
      <ErrorBoundaryRoute path={`${match.url}discount`} component={Discount} />
      <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification} />
      <ErrorBoundaryRoute path={`${match.url}wallet`} component={Wallet} />
      <ErrorBoundaryRoute path={`${match.url}order-discount`} component={OrderDiscount} />
      <ErrorBoundaryRoute path={`${match.url}transaction-history`} component={TransactionHistory} />
      <ErrorBoundaryRoute path={`${match.url}user-profile`} component={UserProfile} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
