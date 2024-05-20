import React, { ChangeEvent, useEffect } from 'react';
import {
  CountryType,
  CountryInputCheckBilling,
} from '../../../../types/registration_form_types/registration_form_types';

function BillingCountryInput({
  selectedCountry,
  billingChangeCountry,
}: CountryInputCheckBilling) {
  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as CountryType;
    billingChangeCountry(selectedValue);
  };

  useEffect(() => {
    if (!selectedCountry) {
      billingChangeCountry('GE');
    }
  }, [billingChangeCountry, selectedCountry]);

  return (
    <div className="registration-input billing-country-select">
      <p className="registration-input__billing-country-lable">
        select country:
      </p>
      <select
        id="billing-country-input"
        name="billingCountry"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="GE">Georgia</option>
        <option value="US">USA</option>
        <option value="RU">Russia</option>
        <option value="CA">Canada</option>
      </select>
    </div>
  );
}

export default BillingCountryInput;
