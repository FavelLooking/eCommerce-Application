import React, { ChangeEvent, useState } from 'react';

function PasswordInput(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const password: string = event.target.value;
    setInputValue(password);

    const passwordRegex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    setIsValid(passwordRegex.test(password.trim()));
  };

  return (
    <label
      className="registration-input password-input"
      htmlFor="password-input"
    >
      <p className="registration-input__password-lable">password:</p>
      <input
        id="password-input"
        type="text"
        placeholder="password"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
    </label>
  );
}

export default PasswordInput;
