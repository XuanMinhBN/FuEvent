import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransactionHistory from './transaction-history';
import TransactionHistoryDetail from './transaction-history-detail';
import TransactionHistoryUpdate from './transaction-history-update';
import TransactionHistoryDeleteDialog from './transaction-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransactionHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransactionHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransactionHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={TransactionHistory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransactionHistoryDeleteDialog} />
  </>
);

export default Routes;
