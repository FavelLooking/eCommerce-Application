import React, { ChangeEvent, useState } from 'react';

function LastNameInput() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lastName: string = event.target.value;
    setInputValue(lastName);

    const lastNameRegex: RegExp = /^[a-zA-Z]+$/;
    setIsValid(lastNameRegex.test(lastName));
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
    </label>
  );
}

export default LastNameInput;
