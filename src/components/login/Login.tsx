import React, { useState } from 'react';

export default function Login() {

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeForm = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setForm({
        ...form,
        [target.name]: target.value,
    });
  }

  function isValidEmail() : boolean {
    const template: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}\S$/;
    return template.test(form.email);
  }

  function isValidPassword() : boolean {
    const template: RegExp = /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])\S*$/;
    return template.test(form.password);
  }

  const onSubmit = () => {
    const isEmailValid = isValidEmail();
    const isPasswordValid = isValidPassword();
    if (isEmailValid && isPasswordValid) {
        setForm({
            email: '',
            password: '',
        });
    };
  }

  const changePasswordVisability = () => {
    const passwordInput = document.getElementById('login-password') as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text';
  }

  return (
    <div id='login-container'>
      <input 
        name='email'
        id='login-email'
        type='text'
        placeholder='Email'
        onChange={changeForm}
      />
      <input 
        name='password'
        id='login-password'
        type='text'
        placeholder='Password'
        onChange={changeForm}
      />
      <input type="checkbox" onClick={changePasswordVisability} />
      <input type='submit' value='Login' onClick={onSubmit} />
    </div>
  );
}