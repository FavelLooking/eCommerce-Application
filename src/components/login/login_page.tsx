import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import AuthService from '../../services/authService';
import './login.scss';
import { LoginFormFields } from '../../types';
import { TextInput } from './text_input';
import {
  emailPattern,
  textLengthPattern,
  textLowerPattern,
  textNumberPattern,
  textSpacesPattern,
  textSymbolPattern,
  textUpperPattern,
  storageLoginError,
} from '../../utils/constants';
import { validateInput } from '../../utils';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const [hidden, setHidden] = useState(false);
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormFields>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const { login } = useAuth();

  const showToast = (text: string) => {
    Toastify({
      text,
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();
  };

  const changePasswordVisability = () => {
    setHidden(!hidden);
  };

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const { email, password } = data;
    await AuthService.loginUser(email, password).then(() => {
      const errorMessage = AuthService.getFromLocalStorage(storageLoginError);
      AuthService.removeFromLocalStorage(storageLoginError);
      if (errorMessage) {
        showToast(errorMessage);
      } else {
        reset();
        login();
      }
    });
  };

  return (
    <div className="login-wrapper">
      <form
        id="login-container"
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          id="login-email"
          {...register('email', {
            required: 'email is required',
            validate: (value) => validateInput([emailPattern], value),
          })}
        />
        {errors.email && (
          <div className="input-error">{errors.email.message}</div>
        )}
        <TextInput
          id="login-password"
          type={hidden ? 'password' : 'text'}
          {...register('password', {
            required: 'password is required',
            validate: (value) =>
              validateInput(
                [
                  textLengthPattern,
                  textLowerPattern,
                  textNumberPattern,
                  textSpacesPattern,
                  textSymbolPattern,
                  textUpperPattern,
                ],
                value
              ),
          })}
        />
        {errors.password && (
          <div className="input-error">{errors.password.message}</div>
        )}
        <div id="login-checkbox">
          Hide password
          <input type="checkbox" onClick={changePasswordVisability} />
        </div>
        <input type="submit" value="Login" className="button" />
        <div>
          <span className="login-text">New to Comics Shop? </span>
          <Link to="/register" className="login-link">
            Create an account.
          </Link>
        </div>
      </form>
    </div>
  );
}
