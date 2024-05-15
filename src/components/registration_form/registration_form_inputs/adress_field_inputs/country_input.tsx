import React, { ChangeEvent, useEffect } from 'react';
import { setCountry } from './postal_code_input_country';
import CountryType from '../../registration_form_types';

type PropsType = {
  selectedCountry: string;
  changeCountry: (str: string) => void;
};
function CountryInput({ selectedCountry, changeCountry }: PropsType) {
  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as CountryType;
    setCountry(selectedValue);
    changeCountry(selectedValue);
  };

  useEffect(() => {
    if (!selectedCountry) {
      setCountry('GE');
      changeCountry('GE');
    }
  }, [changeCountry, selectedCountry]);

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
      </select>
    </div>
  );
}

export default CountryInput;
