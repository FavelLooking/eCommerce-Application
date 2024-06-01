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
  storageLoginError,
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

  const onSubmit: SubmitHandler<PasswordFormFields> = async (data) => {
    const { currentPassword, newPassword } = data;
    await CustomerService.changePassword(currentPassword, newPassword).then(
      () => {
        const errorMessage = AuthService.getFromLocalStorage(storageLoginError);
        AuthService.removeFromLocalStorage(storageLoginError);
        if (errorMessage) {
          showToast(errorMessage);
        } else {
          reset();
          showToast('Password changed successfully');
        }
      }
    );
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
          {...register('currentPassword', {
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
          {errors.currentPassword && errors.currentPassword.message}
        </div>
        <TextInput
          id="new-password"
          type="text"
          placeholder="type your new password"
          {...register('newPassword', {
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
          {errors.newPassword && errors.newPassword.message}
        </div>
        <input type="submit" value="Change password" className="button" />
        <button type="button" className="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
