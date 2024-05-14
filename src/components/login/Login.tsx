import React, { useRef, useState } from 'react';
import Input from './Input';
import './login.scss'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidden, setHidden] = useState(false);
  const formRef = useRef(null);

  const isFormValid = (): boolean => {
    const emailRegexp: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}\S$/;
    const passwordRegexp: RegExp =
      /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])\S*$/;
    return emailRegexp.test(email) && passwordRegexp.test(password);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setEmail('');
      setPassword('');
    }
  };

  const changePasswordVisability = () => {
    setHidden(!hidden);
    if (formRef) {
      const input = (formRef.current as unknown as HTMLFormElement).children[1].children[0] as HTMLInputElement;
      input.type = hidden ? 'text' : 'password';
    }
  };

  return (
    <form id="login-container" onSubmit={onSubmit} ref={formRef} >     
      <Input
        name = 'email'
        id = 'login-email'
        placeholder = 'type your email...'
        onChange = {setEmail}
        value = {email}
      />
      <Input
        name = 'password'
        id = 'login-password'
        placeholder = 'type your password...'
        onChange = {setPassword}
        value = {password}
      />
      <div id="login-checkbox">
        <span>Hide password</span>
        <input type="checkbox" onClick={changePasswordVisability} />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
}
