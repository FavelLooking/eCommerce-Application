import React from 'react';
import EmailInput from './registration_form_inputs/email_input';
import PasswordInput from './registration_form_inputs/password_input';
import FirsNameInput from './registration_form_inputs/first_name_input';
import BirthDateInput from './registration_form_inputs/birth_date_input';
import AdressField from './registration_form_inputs/adress_field';
import LastNameInput from './registration_form_inputs/last_name_input';

function RegisterPage() {
  const handleRegister = () => {};

  return (
    <>
      <EmailInput />
      <PasswordInput />
      <FirsNameInput />
      <LastNameInput />
      <BirthDateInput />
      <AdressField />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </>
  );
}

export default RegisterPage;
