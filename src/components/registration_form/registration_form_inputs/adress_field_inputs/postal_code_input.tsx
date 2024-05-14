import React, { ChangeEvent, useState } from 'react';
import { getCountry } from './postal_code_input_country';
import InputStatus from '../../registration_form_interfaces';
import CountryList from '../../registration_form_enums';

function PostalCodeInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const currentCountry = getCountry();
  const nameCurrentCountry = CountryList[currentCountry];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setInputValue(postalCode);

    const postalCodeFormats = {
      US: /^\d{5}$/,
      CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
      RU: /^\d{6}$/,
      GE: /^\d{4}$/,
    };

    const isValidCountry = postalCodeFormats[currentCountry].test(postalCode);
    setIsValid(isValidCountry);
    onValidationChange(isValidCountry);
  };

  return (
    <label
      className="registration-input postal-code-input"
      htmlFor="postal-code-input"
    >
      <p className="registration-input__postal-code-lable">postal code:</p>
      <input
        id="postal-code-inpur"
        type="text"
        placeholder="postal-code"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>
          must follow the format for the {nameCurrentCountry} postal code
        </div>
      )}
    </label>
  );
}

export default PostalCodeInput;
