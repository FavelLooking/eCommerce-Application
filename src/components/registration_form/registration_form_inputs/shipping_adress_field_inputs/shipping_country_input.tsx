import React, { ChangeEvent, useEffect } from 'react';
import {
  CountryType,
  CountryInputCheckShipping,
} from '../../../../types/registration_form_types/registration_form_types';

function ShippingCountryInput({
  selectedCountry,
  shippingChangeCountry,
}: CountryInputCheckShipping) {
  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as CountryType;
    shippingChangeCountry(selectedValue);
  };

  useEffect(() => {
    if (!selectedCountry) {
      shippingChangeCountry('GE');
    }
  }, [shippingChangeCountry, selectedCountry]);

  return (
    <div className="registration-input shipping-country-select">
      <p className="registration-input__shipping-country-lable">
        select country:
      </p>
      <select
        id="shipping-country-input"
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

export default ShippingCountryInput;
