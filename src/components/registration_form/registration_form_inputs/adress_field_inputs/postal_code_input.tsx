import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../registration_form_interfaces';
import CountryType from '../../registration_form_types';

function PostalCodeInput({
  onValidationChange,
  selectedCountry,
}: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setInputValue(postalCode);

    const postalCodeFormats = {
      US: /^\d{5}$/,
      CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
      RU: /^\d{6}$/,
      GE: /^\d{4}$/,
    };

    const isValidCountry =
      postalCodeFormats[selectedCountry as CountryType].test(postalCode);
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
          must follow the format for the {selectedCountry} postal code
        </div>
      )}
    </label>
  );
}

export default PostalCodeInput;
