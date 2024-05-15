import React, { useState, ChangeEvent } from 'react';
import InputStatus from '../registration_form_interfaces';

function EmailInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email: string = event.target.value;
    setInputValue(email);

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    setIsValid(isValidEmail);
    onValidationChange(isValidEmail);
  };

  return (
    <label className="registration-input email-input" htmlFor="email-input">
      <p className="registration-input__email-lable">email:</p>
      <input
        id="email-input"
        type="email"
        placeholder="email"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && <div style={{ color: 'red' }}>Enter correct email</div>}
    </label>
  );
}

export default EmailInput;
