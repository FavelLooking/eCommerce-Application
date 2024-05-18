import React, { ChangeEvent, useEffect } from 'react';
import {
  CountryType,
  CountryInputCheck,
} from '../../../../types/registration_form_types/registration_form_types';

function CountryInput({ selectedCountry, changeCountry }: CountryInputCheck) {
  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as CountryType;
    changeCountry(selectedValue);
  };

  useEffect(() => {
    if (!selectedCountry) {
      changeCountry('GE');
    }
  }, [changeCountry, selectedCountry]);

  return (
    <div className="registration-input billing-country-select">
      <p className="registration-input__billing-country-lable">
        select country:
      </p>
      <select
        id="billing-country-input"
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

export default CountryInput;
