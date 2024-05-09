import React, { useState } from 'react';

function SecondNameInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="registration-input second-name-input">
      <label htmlFor="second-name-input">
        <div className="registration-input__second-name-lable">
          Second name:
        </div>
        <input
          id="second-name-input"
          type="text"
          placeholder="Second name"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default SecondNameInput;
