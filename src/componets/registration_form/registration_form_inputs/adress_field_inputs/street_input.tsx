import React, { useState } from 'react';

function StreetInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="registration-input street-input">
      <label htmlFor="street-input">
        <div className="registration-input__street-lable">street:</div>
        <input
          id="street-input"
          type="text"
          placeholder="street"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default StreetInput;
