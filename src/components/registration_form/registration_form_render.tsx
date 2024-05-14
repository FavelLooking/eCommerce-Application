import React, { useState } from 'react';
import EmailInput from './registration_form_inputs/email_input';
import PasswordInput from './registration_form_inputs/password_input';
import FirstNameInput from './registration_form_inputs/first_name_input';
import BirthDateInput from './registration_form_inputs/birth_date_input';
import AddressField from './registration_form_inputs/adress_field';
import LastNameInput from './registration_form_inputs/last_name_input';

function RegisterPage() {
  const [passwordValid, setPasswordValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);

  const handleRegister = () => {};

  const isFormValid = () => passwordValid && firstNameValid && lastNameValid;
  return (
    <form className="registration-form" onSubmit={handleRegister}>
      <EmailInput />
      <PasswordInput onValidationChange={setPasswordValid} />
      <FirstNameInput onValidationChange={setFirstNameValid} />
      <LastNameInput onValidationChange={setLastNameValid} />
      <BirthDateInput />
      <AddressField />
      <button type="submit" disabled={!isFormValid()}>
        Register
      </button>
    </form>
  );
}

export default RegisterPage;
