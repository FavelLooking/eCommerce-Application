import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailInput from './registration_form_inputs/email_input';
import PasswordInput from './registration_form_inputs/password_input';
import FirstNameInput from './registration_form_inputs/first_name_input';
import BirthDateInput from './registration_form_inputs/birth_date_input';
import LastNameInput from './registration_form_inputs/last_name_input';
import BillingStreetInput from './registration_form_inputs/billing_adress_field_inputs/billing_street_input';
import BillingCityInput from './registration_form_inputs/billing_adress_field_inputs/billing_city_input';
import BillingPostalCodeInput from './registration_form_inputs/billing_adress_field_inputs/billing_postal_code_input';
import BillingCountryInput from './registration_form_inputs/billing_adress_field_inputs/billing_country_input';
import './registration_form.scss';

function RegisterPage() {
  const [billingSelectedCountry, billingSetSelectedCountry] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [birthDateValid, setBirthDateValid] = useState(false);
  const [billingStreetValid, billingSetStreetValid] = useState(false);
  const [billingCityValid, billingSetCityValid] = useState(false);
  const [billingPostalCodeValid, billingSetPostalCodeValid] = useState(false);

  const billingChangeCountry = (country: string) => {
    billingSetSelectedCountry(country);
  };

  const handleRegister = () => {};

  const isFormValid = () =>
    passwordValid &&
    firstNameValid &&
    lastNameValid &&
    birthDateValid &&
    billingStreetValid &&
    billingCityValid &&
    billingPostalCodeValid &&
    emailValid;

  return (
    <form className="registration-form" onSubmit={handleRegister}>
      <EmailInput onValidationChange={setEmailValid} />
      <PasswordInput onValidationChange={setPasswordValid} />
      <FirstNameInput onValidationChange={setFirstNameValid} />
      <LastNameInput onValidationChange={setLastNameValid} />
      <BirthDateInput onValidationChange={setBirthDateValid} />
      <div className="registration-input billing-adress-field">
        <p className="registration-input__billing-adress-field-title">
          billing adress field:
        </p>
        <div className="registration-input__billing-adress-field">
          <BillingStreetInput onValidationChange={billingSetStreetValid} />
          <BillingCityInput onValidationChange={billingSetCityValid} />
          <BillingCountryInput
            selectedCountry={billingSelectedCountry}
            changeCountry={billingChangeCountry}
          />
          <BillingPostalCodeInput
            onValidationChange={billingSetPostalCodeValid}
            selectedCountry={billingSelectedCountry}
          />
        </div>
      </div>
      <div className="registration-input shipping-address-field">
        <p className="registration-input__shipping-adress-field-title">
          shipping adress field:
        </p>
      </div>
      <button type="submit" disabled={!isFormValid()}>
        register
      </button>
      <div className="registration-link-wrapper">
        <Link to="/login" className="registration-link">
          already have an account? login
        </Link>
      </div>
    </form>
  );
}

export default RegisterPage;
