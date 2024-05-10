import React, { useState, ChangeEvent } from 'react';

function EmailInput(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const email: string = event.target.value;
    setInputValue(email);

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  };

  return (
    <div className="registration-input email-input">
      <label htmlFor="email-input">
        <div className="registration-input__email-lable">email:</div>
        <input
          id="email-input"
          type="email"
          placeholder="email"
          value={inputValue}
          onChange={handleChange}
          style={{ borderColor: isValid ? 'initial' : 'red' }}
        />
      </label>
      {!isValid && (
        <div style={{ color: 'red' }}>Please enter a valid email address</div>
      )}
    </div>
  );
}

export default EmailInput;
