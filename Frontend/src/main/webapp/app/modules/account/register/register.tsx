import React, { useState, useEffect } from 'react';
import { Translate, translate, isEmail } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from 'app/assets/images/logo.png';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const successMessage = useAppSelector(state => state.register.successMessage);
  const loading = useAppSelector(state => state.register.loading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const firstPasswordValue = watch('firstPassword');

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  const handleValidSubmit = data => {
    const { username, email, firstPassword } = data;
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: currentLocale }));
  };

  const updatePasswordStrength = e => {
    setPasswordStrength(e.target.value);
  };

  return (
    <div className="auth-page">
      <Link to="/" className="absolute top-4 left-4 text-gray-500 hover:text-orange-500 transition-colors">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <Translate contentKey="entity.action.back">Back</Translate>
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="auth-card">
        {/* --- Header --- */}
        <div className="text-center mb-4">
          <h2 className="auth-title flex justify-center">
            <img src={logo} alt="logo" className="logo" style={{ height: '60px', objectFit: 'contain' }} />
          </h2>
          <h2 className="text-xl mt-2">
            <Translate contentKey="register.title">Registration</Translate>
          </h2>
        </div>

        {/* --- Form --- */}
        <form className="auth-form" onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="space-y-4">
            {/* Username */}
            <div className="form-row block">
              <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
                <Translate contentKey="global.form.username.label">Username</Translate>
              </label>
              <input
                id="username"
                className={`input-field ${errors.username ? 'border-red-500' : ''}`}
                placeholder={translate('global.form.username.placeholder')}
                {...register('username', {
                  required: { value: true, message: translate('register.messages.validate.login.required') },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: translate('register.messages.validate.login.pattern'),
                  },
                  minLength: { value: 1, message: translate('register.messages.validate.login.minlength') },
                  maxLength: { value: 50, message: translate('register.messages.validate.login.maxlength') },
                })}
              />
              {errors.username && <span className="text-red-500 text-xs mt-1 block">{errors.username.message as string}</span>}
            </div>

            {/* Email */}
            <div className="form-row block">
              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                <Translate contentKey="global.form.email.label">Email</Translate>
              </label>
              <input
                id="email"
                type="email"
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                placeholder={translate('global.form.email.placeholder')}
                {...register('email', {
                  required: { value: true, message: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, message: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, message: translate('global.messages.validate.email.maxlength') },
                  validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
                })}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message as string}</span>}
            </div>

            {/* Password */}
            <div className="form-row block">
              <label htmlFor="firstPassword" className="block font-medium text-gray-700 mb-1">
                <Translate contentKey="global.form.newpassword.label">New Password</Translate>
              </label>
              <div className="input-wrapper relative">
                <input
                  id="firstPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`input-field input-with-icon ${errors.firstPassword ? 'border-red-500' : ''}`}
                  placeholder={translate('global.form.newpassword.placeholder')}
                  {...register('firstPassword', {
                    required: { value: true, message: translate('global.messages.validate.newpassword.required') },
                    minLength: { value: 4, message: translate('global.messages.validate.newpassword.minlength') },
                    maxLength: { value: 50, message: translate('global.messages.validate.newpassword.maxlength') },
                    onChange: e => updatePasswordStrength(e), // Sync with Strength Bar
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-btn-abs absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              {/* Strength Bar */}
              <div className="mt-1">
                <PasswordStrengthBar password={passwordStrength} />
              </div>
              {errors.firstPassword && <span className="text-red-500 text-xs mt-1 block">{errors.firstPassword.message as string}</span>}
            </div>

            {/* Confirm Password */}
            <div className="form-row block">
              <label htmlFor="secondPassword" className="block font-medium text-gray-700 mb-1">
                <Translate contentKey="global.form.confirmpassword.label">Confirm Password</Translate>
              </label>
              <div className="input-wrapper relative">
                <input
                  id="secondPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`input-field input-with-icon ${errors.secondPassword ? 'border-red-500' : ''}`}
                  placeholder={translate('global.form.confirmpassword.placeholder')}
                  {...register('secondPassword', {
                    required: { value: true, message: translate('global.messages.validate.confirmpassword.required') },
                    minLength: { value: 4, message: translate('global.messages.validate.confirmpassword.minlength') },
                    maxLength: { value: 50, message: translate('global.messages.validate.confirmpassword.maxlength') },
                    validate: v => v === firstPasswordValue || translate('global.messages.error.dontmatch'),
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eye-btn-abs absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              {errors.secondPassword && <span className="text-red-500 text-xs mt-1 block">{errors.secondPassword.message as string}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="actions-center mt-6 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`submit-button w-full shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="flex items-center justify-center">
                {loading && (
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
                )}
                <span>{loading ? 'Processing...' : <Translate contentKey="register.form.button">Register</Translate>}</span>
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="auth-subtitle mt-4 text-center">
            <span className="text-gray-600">
              <Translate contentKey="global.messages.info.authenticated.prefix">Already have an account? </Translate>
            </span>
            <Link to="/login" className="link font-bold hover:underline ml-1">
              <Translate contentKey="global.messages.info.authenticated.link">Sign In</Translate>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
