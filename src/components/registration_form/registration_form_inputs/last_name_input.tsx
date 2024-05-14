import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../registration_form_interfaces';

function LastNameInput({ onValidationChange }: InputStatus) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lastName: string = event.target.value;
    setInputValue(lastName);

    const lastNameRegex: RegExp = /^[a-zA-Z]+$/;
    const isValidLastName = lastNameRegex.test(lastName);
    setIsValid(isValidLastName);
    onValidationChange(isValidLastName);
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
        <div style={{ color: 'red' }}>
          must contain at least one character and no special characters or
          numbers
        </div>
      )}
    </label>
  );
}

export default LastNameInput;
