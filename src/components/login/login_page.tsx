import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './login.scss';
import { LoginFormFields } from '../../types';
import TextInput from './text_input';
import {
  emailPattern,
  textLengthPattern,
  textLowerPattern,
  textNumberPattern,
  textSpacesPattern,
  textSymbolPattern,
  textUpperPattern,
} from '../../utils/constants';

export default function Login() {
  const [hidden, setHidden] = useState(false);
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormFields>();

  const changePasswordVisability = () => {
    setHidden(!hidden);
    if (formRef) {
      const input = (formRef.current as unknown as HTMLFormElement).children[1]
        .children[0] as HTMLInputElement;
      input.type = hidden ? 'text' : 'password';
    }
  };

  const onSubmit: SubmitHandler<LoginFormFields> = () => {
    reset();
  };

  return (
    <form id="login-container" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="email"
        id="login-email"
        register={register}
        registerLabel="email"
        pattern={[emailPattern]}
      />
      {errors.email && (
        <div className="input-error">{errors.email.message}</div>
      )}
      <TextInput
        name="password"
        id="login-password"
        register={register}
        registerLabel="password"
        pattern={[
          textLengthPattern,
          textLowerPattern,
          textNumberPattern,
          textSpacesPattern,
          textSymbolPattern,
          textUpperPattern,
        ]}
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
