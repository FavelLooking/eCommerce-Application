import React, { ChangeEvent, useState } from 'react';

function FirsNameInput(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const firstName: string = event.target.value;
    setInputValue(firstName);

    const firstNameRegex: RegExp = /^[a-zA-Z]+$/;
    setIsValid(firstNameRegex.test(firstName.trim()));
  };

  return (
    <div className="registration-input first-name-input">
      <label htmlFor="first-name-input">
        <div className="registration-input__first-name-lable">First name:</div>
        <input
          id="first-name-input"
          type="text"
          placeholder="First name"
          value={inputValue}
          onChange={handleChange}
          style={{ borderColor: isValid ? 'initial' : 'red' }}
        />
      </label>
    </div>
  );
}

export default FirsNameInput;
