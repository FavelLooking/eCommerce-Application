import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import InputStatus from '../../registration_form_interfaces';
import { CountryType } from '../../registration_form_types';

function PostalCodeInput({
  onValidationChange,
  selectedCountry,
}: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const postalCodeFormats = useMemo(
    () => ({
      US: /^\d{5}$/,
      CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
      RU: /^\d{6}$/,
      GE: /^\d{4}$/,
    }),
    []
  );

  useEffect(() => {
    if (selectedCountry && inputValue !== '') {
      const isValidSelectedCountry =
        postalCodeFormats[selectedCountry as CountryType].test(inputValue);
      setIsValid(isValidSelectedCountry);
      onValidationChange(isValidSelectedCountry);
    }
  }, [selectedCountry, inputValue, onValidationChange, postalCodeFormats]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setInputValue(postalCode);

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
        id="postal-code-input"
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
