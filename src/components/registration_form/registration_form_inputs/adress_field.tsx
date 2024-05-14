import React from 'react';
import StreetInput from './adress_field_inputs/street_input';
import CityInput from './adress_field_inputs/city_input';
import PostalCodeInput from './adress_field_inputs/postal_code_input';
import CountryInput from './adress_field_inputs/country_input';

function AddressField() {
  return (
    <div className="registration-input adress-field">
      <p className="registration-input__adress-field-title">Adress field:</p>
      <div className="registration-input__adress-field">
        <StreetInput />
        <CityInput />
        <PostalCodeInput />
        <CountryInput />
      </div>
    </div>
  );
}

export default AddressField;
