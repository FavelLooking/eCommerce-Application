import React, { useState } from 'react';

function PasswordInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="registration-input password-input">
      <label htmlFor="password-input">
        <div className="registration-input__password-lable">password:</div>
        <input
          id="password-input"
          type="text"
          placeholder="password"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default PasswordInput;
