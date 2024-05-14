import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../registration_form_interfaces';

function FirstNameInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const firstName: string = event.target.value;
    setInputValue(firstName);

    const firstNameRegex: RegExp = /^[a-zA-Z]+$/;
    const isValidFirstName = firstNameRegex.test(firstName);
    setIsValid(isValidFirstName);
    onValidationChange(isValidFirstName);
  };

  return (
    <label
      className="registration-input first-name-input"
      htmlFor="first-name-input"
    >
      <p className="registration-input__first-name-lable">First name:</p>
      <input
        id="first-name-input"
        type="text"
        placeholder="First name"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>
          must contain at least one character and no special characters or
          numbers
        </div>
      )}
    </label>
  );
}

export default FirstNameInput;
