import React, { useState } from 'react';
import { Translate, translate } from 'react-jhipster';
import { Modal, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from 'app/assets/images/logo.png';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const { loginError, handleClose, showModal } = props;
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  return (
    <Modal
      isOpen={showModal}
      toggle={handleClose}
      backdrop="static"
      id="login-page"
      autoFocus={false}
      // "flex items-center justify-center" thay cho "modal-dialog-centered" nếu cần chỉnh layout modal cha
      // contentClassName giúp xóa border/bg mặc định của Bootstrap Modal
      className="flex items-center justify-center min-h-screen"
      contentClassName="bg-transparent border-0 shadow-none w-full max-w-md mx-auto"
      // Xóa animation mặc định của Bootstrap để dùng framer-motion
      fade={false}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card mx-auto" // Class SCSS
      >
        {/* --- Header: Logo & Title --- */}
        <div className="text-center mb-6">
          <h2 className="auth-title flex justify-center">
            <img src={logo} alt="logo" className="logo" style={{ height: '60px', objectFit: 'contain' }} />
          </h2>
          <p className="auth-subtitle mt-2">
            <Translate contentKey="login.title">Sign in</Translate>
          </p>
        </div>

        {/* --- Error Alert --- */}
        {loginError && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center" data-cy="loginError">
            <Translate contentKey="login.messages.error.authentication">
              <strong>Failed to sign in!</strong> Please check your credentials and try again.
            </Translate>
          </div>
        )}

        {/* --- Form --- */}
        <Form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="space-y-5">
            {/* Username Field */}
            <div className="form-row block">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                <Translate contentKey="global.form.username.label">Username</Translate>
              </label>
              <input
                id="username"
                // Logic class: input-field (SCSS) + Tailwind border error state
                className={`input-field ${errors.username ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder={translate('global.form.username.placeholder')}
                autoFocus
                {...register('username', { required: 'Username cannot be empty!' })}
                data-cy="username"
              />
              {errors.username && <span className="text-red-500 text-xs mt-1 block">{errors.username.message as string}</span>}
            </div>

            {/* Password Field */}
            <div className="form-row block">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                <Translate contentKey="login.form.password">Password</Translate>
              </label>
              <div className="input-wrapper relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`input-field input-with-icon ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder={translate('login.form.password.placeholder')}
                  {...register('password', { required: 'Password cannot be empty!' })}
                  data-cy="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-btn-abs absolute right-2 top-1/2 -translate-y-1/2"
                  aria-label="Toggle password visibility"
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message as string}</span>}
            </div>
          </div>

          {/* Links: Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mt-4">
            {/* Custom Checkbox using Tailwind */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                {...register('rememberMe')}
                defaultChecked={true}
              />
              <label className="ml-2 block text-sm text-gray-500 cursor-pointer" htmlFor="rememberMe">
                <Translate contentKey="login.form.rememberme">Remember me</Translate>
              </label>
            </div>

            <div className="text-sm">
              <Link to="/account/reset/request" className="link font-medium hover:underline" data-cy="forgetYourPasswordSelector">
                <Translate contentKey="login.password.forgot">Forgot password?</Translate>
              </Link>
            </div>
          </div>

          {/* --- Submit Button --- */}
          <div className="mt-6 flex flex-col items-center justify-center">
            <button type="submit" className="submit-button w-full shadow-lg" data-cy="submit">
              <Translate contentKey="login.form.button">Sign in</Translate>
            </button>
          </div>

          {/* --- Cancel Button --- */}
          <div className="mt-3 text-center">
            <button type="button" onClick={handleClose} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </button>
          </div>

          {/* --- Divider --- */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400">or</span>
            </div>
          </div>

          {/* --- Footer: Register --- */}
          <div className="text-center text-sm">
            <span className="text-gray-600">
              <Translate contentKey="global.messages.info.register.noaccount">Don&apos;t have an account?</Translate>{' '}
            </span>
            <Link to="/account/register" className="link font-bold hover:underline ml-1">
              <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
            </Link>
          </div>
        </Form>
      </motion.div>
    </Modal>
  );
};

export default LoginModal;
