import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from 'app/assets/images/logo.png';
import './login.scss';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { login } from 'app/shared/reducers/authentication';
import { setDataUser } from 'app/shared/redux/userSlice';
import { getSession } from 'app/shared/reducers/authentication';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const { from } = location.state || { from: { pathname: '/', search: location.search } };

  const onSubmit = async ({ username, password, rememberMe }) => {
    setIsLoading(true);
    try {
      await (dispatch(login(username, password, rememberMe)) as any);
      let userAccount = null;
      try {
        const resultAction = await (dispatch(getSession()) as any);
        const payload = resultAction?.payload || resultAction;
        userAccount = payload?.data || payload;
      } catch (err) {
        console.warn('Lấy thông tin user thất bại, nhưng vẫn sẽ cho đăng nhập:', err);
      }
      if (userAccount) {
        // eslint-disable-next-line no-console
        console.log('Lấy được thông tin user:', userAccount);
        localStorage.setItem('user', JSON.stringify(userAccount));
        dispatch(setDataUser(userAccount));
      } else {
        const fallbackUser = { login: username, lastName: 'User' };
        localStorage.setItem('user', JSON.stringify(fallbackUser));
        dispatch(setDataUser(fallbackUser));
      }
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 100);
    } catch (error) {
      console.error('Login process failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/" className="absolute top-4 left-4 text-gray-500 hover:text-orange-500 transition-colors">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <Translate contentKey="entity.action.back">Back</Translate>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl" // Card trắng nổi bật
      >
        {/* --- Header: Logo & Title --- */}
        <div className="text-center">
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="h-16 w-auto object-contain" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            <Translate contentKey="login.title">Sign in</Translate>
          </h2>
          <p className="mt-2 text-sm text-red-600">Welcome back to FuEvent</p>
        </div>

        {/* --- Error Alert --- */}
        {loginError && (
          <div className="p-4 rounded-md bg-red-50 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">{/* Icon cảnh báo (có thể thêm sau) */}</div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Failed to sign in!</strong>
                  </Translate>
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* --- Form --- */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block font-medium text-gray-700">
                <Translate contentKey="global.form.username.label">Username</Translate>
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors`}
                  placeholder={translate('global.form.username.placeholder')}
                  {...register('username', { required: 'Username cannot be empty!' })}
                />
                {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message as string}</p>}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">
                <Translate contentKey="login.form.password">Password</Translate>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors`}
                  placeholder={translate('login.form.password.placeholder')}
                  {...register('password', { required: 'Password cannot be empty!' })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message as string}</p>}
            </div>
          </div>

          {/* Links: Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
                {...register('rememberMe')}
                defaultChecked={true}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                <Translate contentKey="login.form.rememberme">Remember me</Translate>
              </label>
            </div>

            <div className="text-sm">
              <Link to="/account/reset/request" className="font-medium text-orange-600 hover:text-orange-500 hover:underline">
                <Translate contentKey="login.password.forgot">Forgot password?</Translate>
              </Link>
            </div>
          </div>

          {/* --- Submit Button --- */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-md transform transition hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <Translate contentKey="login.form.button">Sign in</Translate>
              )}
            </button>
          </div>
        </form>

        {/* --- Footer: Register --- */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            <Translate contentKey="global.messages.info.register.noaccount">Don&apos;t have an account?</Translate>{' '}
          </span>
          <Link to="/account/register" className="font-medium text-orange-600 hover:text-orange-500 hover:underline ml-1">
            <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
