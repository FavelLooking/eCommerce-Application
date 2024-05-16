import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../registration_form_interfaces';
import validationInput from '../../registration_form_validation_regex';
import { streetPatternRegistration } from '../../registration_form_regex';

function StreetInput({ onValidationChange }: InputStatus) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const street = event.target.value;
    setInputValue(street);

    setIsValid(validationInput(streetPatternRegistration.regex, street));
    onValidationChange(
      validationInput(streetPatternRegistration.regex, street)
    );
  };

  return (
    <label className="registration-input street-input" htmlFor="street-input">
      <p className="registration-input__street-lable">street:</p>
      <input
        id="street-input"
        type="text"
        placeholder="street"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>{streetPatternRegistration.error}</div>
      )}
    </label>
  );
}

export default StreetInput;
