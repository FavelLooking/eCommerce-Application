import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../../types/registration_form_types/registration_form_interfaces';
import validationInput from '../../../utils/registration_form_utils/registration_form_validation_regex';
import { lastNamePatternRegistration } from '../../../utils/registration_form_utils/registration_form_regex';

function LastNameInput({ onValidationChange }: InputStatus) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lastName: string = event.target.value;
    setInputValue(lastName);

    setIsValid(validationInput(lastNamePatternRegistration.regex, lastName));
    onValidationChange(
      validationInput(lastNamePatternRegistration.regex, lastName)
    );
  };

  return (
    <label
      className="registration-input last-name-input"
      htmlFor="last-name-input"
    >
      <p className="registration-input__last-name-lable">Second name:</p>
      <input
        id="last-name-input"
        type="text"
        placeholder="Last name"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>{lastNamePatternRegistration.error}</div>
      )}
    </label>
  );
}

export default LastNameInput;
