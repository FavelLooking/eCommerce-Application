import React from 'react';
import EmailInput from './registration_form_inputs/email_input';
import PasswordInput from './registration_form_inputs/password_input';
import FirstNameInput from './registration_form_inputs/first_name_input';
import BirthDateInput from './registration_form_inputs/birth_date_input';
import AddressField from './registration_form_inputs/adress_field';
import LastNameInput from './registration_form_inputs/last_name_input';

function RegisterPage() {
  const handleRegister = () => {};

  return (
    <form className="registration-form" onSubmit={handleRegister}>
      <EmailInput />
      <PasswordInput />
      <FirstNameInput />
      <LastNameInput />
      <BirthDateInput />
      <AddressField />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
