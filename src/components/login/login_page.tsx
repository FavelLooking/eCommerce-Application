import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const changePasswordVisability = () => {
    setHidden(!hidden);
    if (formRef) {
      const formChilds = (formRef.current as unknown as HTMLFormElement)
        .children;
      for (let i = 0; i < formChilds.length; i += 1) {
        if (
          formChilds[i].childElementCount &&
          formChilds[i].children[0].id === 'login-password'
        ) {
          (formChilds[i].children[0] as HTMLInputElement).type = hidden
            ? 'text'
            : 'password';
        }
      }
    }
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
    </form>
  );
}
