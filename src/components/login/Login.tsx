import React, { useState } from 'react';
import Input from './Input';

export default function Login() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const isFormValid = (): boolean => {
    const emailRegexp: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}\S$/;
    const passwordRegexp: RegExp =
      /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])\S*$/;
    return emailRegexp.test(email) && passwordRegexp.test(password);
  }

  const onSubmit = () => {
    if (isFormValid()) {
      setEmail('');
      setPassword('');
      (document.getElementById('login-email') as HTMLInputElement).value = '';
      (document.getElementById('login-password') as HTMLInputElement).value = '';
    }
  };

  const changePasswordVisability = () => {
    const passwordInput = document.getElementById(
      'login-password'
    ) as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text';
  };

  return (
    <div id="login-container">
      <Input {...{
        name: 'email',
        id: 'login-email',
        placeholder: `type your email...`,
        onChange: setEmail,
      }} />
      <Input {...{
        name: 'password',
        id: 'login-password',
        placeholder: `type your password...`,
        onChange: setPassword,
      }} />
      <input type='checkbox' onClick={changePasswordVisability} />
      <input type='submit' value='Login' onClick={onSubmit} />
    </div>
  );
}
