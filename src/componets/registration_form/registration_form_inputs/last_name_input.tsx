import React, { useState } from 'react';

function LastNameInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
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
        />
      </label>
    </div>
  );
}

export default LastNameInput;
