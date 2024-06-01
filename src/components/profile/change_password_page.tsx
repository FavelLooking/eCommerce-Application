import React, { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Toastify from 'toastify-js';
import { TextInput } from '../login/text_input';
import './change_password_page.scss';

import {
  textLengthPattern,
  textLowerPattern,
  textNumberPattern,
  textSpacesPattern,
  textSymbolPattern,
  textUpperPattern,
} from '../../utils/constants';
import AuthService from '../../services/authService';
import { validateInput } from '../../utils';
import { PasswordFormFields } from '../../types/profile/change_password_page';
import CustomerService from '../../services/customerService';

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormFields>({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const formRef = useRef(null);
  const showToast = (text: string) => {
    Toastify({
      text,
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();
  };

  const reconnect = (email: string, renew: string) => {
    AuthService.logoutUser();
    AuthService.loginUser(email, renew);
  };

  const handleErrors = () => {
    const errorMessage = AuthService.getFromLocalStorage('ErrorMessage');
    if (errorMessage) {
      showToast(errorMessage);
    }
    AuthService.removeFromLocalStorage('ErrorMessage');
  };

  const onSubmit: SubmitHandler<PasswordFormFields> = async (data) => {
    const { current, renew } = data;
    try {
      const email = await CustomerService.changePassword(current, renew);
      if (!email) {
        throw new Error('Email not found after changing password.');
      }

      reset();
      showToast('Password changed successfully');
      reconnect(email, renew);
    } catch (error) {
      handleErrors();
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="change-password-page">
      <form id="password-form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="current-password"
          type="text"
          placeholder="type your current password"
          {...register('current', {
            required: 'password is required',
            validate: (value: string) =>
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

        <div className="input-error-password">
          {errors.current && errors.current.message}
        </div>
        <TextInput
          id="new-password"
          type="text"
          placeholder="type your new password"
          {...register('renew', {
            required: 'password is required',
            validate: (value: string) =>
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
        <div className="input-error-password">
          {errors.renew && errors.renew.message}
        </div>
        <input type="submit" value="Change password" className="button" />
        <button type="button" className="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
