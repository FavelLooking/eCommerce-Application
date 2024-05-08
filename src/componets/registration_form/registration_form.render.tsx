import React from 'react';
import EmailInput from './email_input';
import PasswordInput from './password_input';
import FirsNameInput from './first_name_input';
import SecondNameInput from './second_name_input';

function RegisterPage() {
  return (
    <>
      <EmailInput />
      <PasswordInput />
      <FirsNameInput />
      <SecondNameInput />
    </>
  );
}

export default RegisterPage;
