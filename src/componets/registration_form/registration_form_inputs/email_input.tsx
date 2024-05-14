import React, { useState, ChangeEvent } from 'react';

function EmailInput(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const email: string = event.target.value;
    setInputValue(email);

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email.trim()));
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
    </label>
  );
}

export default EmailInput;
