import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';
import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Card } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const AppInner = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isFullPage = location.pathname === '/login' || location.pathname === '/account/register';

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const paddingTop = '60px';
  return (
    <div className="app-container" style={{ paddingTop: isFullPage ? '0' : '2px' }}>
      <ToastContainer position="top-left" className="toastify-container" toastClassName="toastify-toast" />

      {/* Ẩn Header nếu là FullPage */}
      {!isFullPage && (
        <ErrorBoundary>
          <Header
          // isAuthenticated={isAuthenticated}
          // isAdmin={isAdmin}
          // currentLocale={useAppSelector(state => state.locale.currentLocale)}
          // ribbonEnv={ribbonEnv}
          // isInProduction={isInProduction}
          // isOpenAPIEnabled={isOpenAPIEnabled}
          />
        </ErrorBoundary>
      )}

      {/* Logic Container */}
      <div className={isFullPage ? '' : 'container-fluid view-container'} id="app-view-container">
        <Card className={isFullPage ? 'border-0 shadow-none bg-transparent' : 'jh-card mx-auto max-w-7xl'}>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </Card>
      </div>

      {/* Ẩn Footer nếu là FullPage */}
      {!isFullPage && <Footer />}
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter basename={baseHref}>
      <AppInner />
    </BrowserRouter>
  );
};

export default App;
