import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
} from '../../utils/constants';
import validateInput from '../../utils/validation';

export default function Login() {
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

  const changePasswordVisability = () => {
    setHidden(!hidden);
  };

  const onSubmit: SubmitHandler<LoginFormFields> = () => {
    reset();
  };

  return (
    <form id="login-container" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
      <input type="submit" value="Login" />
      <div>
        New to Comics Shop?
        <Link to="/register" className="login-link">
          {' '}
          Create an account.
        </Link>
      </div>
    </form>
  );
}
