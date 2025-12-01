import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OrderDiscount from './order-discount';
import OrderDiscountDetail from './order-discount-detail';
import OrderDiscountUpdate from './order-discount-update';
import OrderDiscountDeleteDialog from './order-discount-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OrderDiscountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OrderDiscountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OrderDiscountDetail} />
      <ErrorBoundaryRoute path={match.url} component={OrderDiscount} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OrderDiscountDeleteDialog} />
  </>
);

export default Routes;
