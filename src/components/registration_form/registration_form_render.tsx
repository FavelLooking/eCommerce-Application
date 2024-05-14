import React, { useState } from 'react';
import EmailInput from './registration_form_inputs/email_input';
import PasswordInput from './registration_form_inputs/password_input';
import FirstNameInput from './registration_form_inputs/first_name_input';
import BirthDateInput from './registration_form_inputs/birth_date_input';
import LastNameInput from './registration_form_inputs/last_name_input';
import StreetInput from './registration_form_inputs/adress_field_inputs/street_input';
import CityInput from './registration_form_inputs/adress_field_inputs/city_input';
import PostalCodeInput from './registration_form_inputs/adress_field_inputs/postal_code_input';
import CountryInput from './registration_form_inputs/adress_field_inputs/country_input';

function RegisterPage() {
  const [passwordValid, setPasswordValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [birthDateValid, setBirthDateValid] = useState(false);
  const [streetValid, setStreetValid] = useState(false);
  const [cityValid, setCityValid] = useState(false);
  const [postalCodeValid, setPostalCodeValid] = useState(false);

  const handleRegister = () => {};

  const isFormValid = () =>
    passwordValid &&
    firstNameValid &&
    lastNameValid &&
    birthDateValid &&
    streetValid &&
    cityValid &&
    postalCodeValid;
  return (
    <form className="registration-form" onSubmit={handleRegister}>
      <EmailInput />
      <PasswordInput onValidationChange={setPasswordValid} />
      <FirstNameInput onValidationChange={setFirstNameValid} />
      <LastNameInput onValidationChange={setLastNameValid} />
      <BirthDateInput onValidationChange={setBirthDateValid} />
      <div className="registration-input adress-field">
        <p className="registration-input__adress-field-title">Adress field:</p>
        <div className="registration-input__adress-field">
          <StreetInput onValidationChange={setStreetValid} />
          <CityInput onValidationChange={setCityValid} />
          <PostalCodeInput onValidationChange={setPostalCodeValid} />
          <CountryInput />
        </div>
      </div>
      <button type="submit" disabled={!isFormValid()}>
        Register
      </button>
    </form>
  );
}

export default RegisterPage;
