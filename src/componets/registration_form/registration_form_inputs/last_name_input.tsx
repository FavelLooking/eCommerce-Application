import React, { ChangeEvent, useState } from 'react';

function LastNameInput() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const lastName: string = event.target.value;
    setInputValue(lastName);

    const lastNameRegex: RegExp = /^[a-zA-Z]+$/;
    setIsValid(lastNameRegex.test(lastName));
  };

  return (
    <div className="registration-input last-name-input">
      <label htmlFor="last-name-input">
        <div className="registration-input__last-name-lable">Second name:</div>
        <input
          id="last-name-input"
          type="text"
          placeholder="Last name"
          value={inputValue}
          onChange={handleChange}
          style={{ borderColor: isValid ? 'initial' : 'red' }}
        />
      </label>
    </div>
  );
}

export default LastNameInput;
