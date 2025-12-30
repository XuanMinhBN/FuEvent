import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import { EntityRoutes } from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import { Home } from './pages/home/home';
import { Spinner } from 'reactstrap';

const Account = React.lazy(() => import(/* webpackChunkName: "account" */ 'app/modules/account'));
const Admin = React.lazy(() => import(/* webpackChunkName: "administration" */ 'app/modules/administration'));

const ApplicationRoutes = () => {
  return (
    <div className="view-routes">
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh', width: '100%' }}>
            <Spinner type="border" color="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/activate/:key" element={<Activate />} />{' '}
          {/* v6 tự xử lý optional param tốt hơn, nhưng ? vẫn hoạt động trong regex path nếu cần */}
          <Route path="/account/reset/request" element={<PasswordResetInit />} />
          <Route path="/account/reset/finish/:key" element={<PasswordResetFinish />} />
          {/* Private Routes:
              Lưu ý 1: path cần thêm '/*' nếu component con (Admin/Account) có khai báo Routes riêng.
              Lưu ý 2: Cách dùng PrivateRoute dưới đây giả định component PrivateRoute đã được sửa để bọc children.
          */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/account/*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          {/* Entities thường chứa sub-routes, nên cần /* */}
          <Route
            path="/*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <EntityRoutes />
              </PrivateRoute>
            }
          />
          {/* Route bắt lỗi 404 (Page Not Found) */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default ApplicationRoutes;
