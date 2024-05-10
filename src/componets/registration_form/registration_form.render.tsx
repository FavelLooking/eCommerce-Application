import React from 'react';
import EmailInput from './registration_form_inputs/email_input';
import PasswordInput from './registration_form_inputs/password_input';
import FirsNameInput from './registration_form_inputs/first_name_input';
import SecondNameInput from './registration_form_inputs/second_name_input';
import BirthDateInput from './registration_form_inputs/birth_date_input';
import AdressField from './registration_form_inputs/adress_field';

function RegisterPage() {
  const handleRegister = () => {
    console.log('Registration logic');
  };

  return (
    <>
      <EmailInput />
      <PasswordInput />
      <FirsNameInput />
      <SecondNameInput />
      <BirthDateInput />
      <AdressField />
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </>
  );
}

export default RegisterPage;
