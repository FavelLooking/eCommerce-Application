import React, { useState } from 'react';

function FirsNameInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
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
        />
      </label>
    </div>
  );
}

export default FirsNameInput;
