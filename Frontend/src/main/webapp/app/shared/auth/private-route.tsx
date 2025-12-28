import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { useAppSelector } from 'app/config/store';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { Spinner } from 'reactstrap';

interface IOwnProps {
  children: JSX.Element; // Thay thế cho RouteProps và component
  hasAnyAuthorities?: string[];
}

export const PrivateRouteComponent = ({ children, hasAnyAuthorities = [] }: IOwnProps) => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const sessionHasBeenFetched = useAppSelector(state => state.authentication.sessionHasBeenFetched);
  const account = useAppSelector(state => state.authentication.account);
  const location = useLocation();
  const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);

  if (!sessionHasBeenFetched) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh', width: '100%' }}>
        <Spinner type="border" color="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">
          <Translate contentKey="error.http.403">You are not authorized to access this page.</Translate>
        </div>
      </div>
    );
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some(auth => authorities.includes(auth));
  }
  return false;
};

export default PrivateRouteComponent;
