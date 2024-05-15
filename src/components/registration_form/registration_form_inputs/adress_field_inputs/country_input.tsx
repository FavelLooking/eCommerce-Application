import React, { ChangeEvent, useState } from 'react';
import { setCountry } from './postal_code_input_country';
import CountryType from '../../registration_form_types';
import PostalCodeInput from './postal_code_input';

function CountryInput() {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as CountryType;
    setCountry(selectedValue);
    setSelectedCountry(selectedValue);
  };

  return (
    <div className="registration-input country-select">
      <p className="registration-input__country-lable">Select country:</p>
      <select
        id="country-input"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="GE">Georgia</option>
        <option value="US">USA</option>
        <option value="RU">Russia</option>
        <option value="CA">Canada</option>
        {/* <PostalCodeInput onValidationChange={onValidationChange}/> */}
      </select>
    </div>
  );
}

export default CountryInput;
