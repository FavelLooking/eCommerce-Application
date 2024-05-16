import React, { ChangeEvent, useEffect, useState } from 'react';
import InputStatus from '../../../../types/registration_form_types/registration_form_interfaces';
import { CountryType } from '../../../../types/registration_form_types/registration_form_types';
import validationInput from '../../../../utils/registration_form_utils/registration_form_validation_regex';
import { postalCodeFormatsRegistration } from '../../../../utils/registration_form_utils/registration_form_regex';

function PostalCodeInput({
  onValidationChange,
  selectedCountry,
}: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (selectedCountry && inputValue !== '') {
      setIsValid(
        validationInput(
          postalCodeFormatsRegistration[selectedCountry as CountryType],
          inputValue
        )
      );
      onValidationChange(
        validationInput(
          postalCodeFormatsRegistration[selectedCountry as CountryType],
          inputValue
        )
      );
    }
  }, [selectedCountry, inputValue, onValidationChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setInputValue(postalCode);

    setIsValid(
      validationInput(
        postalCodeFormatsRegistration[selectedCountry as CountryType],
        postalCode
      )
    );
    onValidationChange(
      validationInput(
        postalCodeFormatsRegistration[selectedCountry as CountryType],
        postalCode
      )
    );
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
