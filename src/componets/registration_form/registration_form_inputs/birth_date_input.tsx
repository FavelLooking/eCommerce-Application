import React, { useState } from 'react';

function BirthDateInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="registration-input birth-date-input">
      <label htmlFor="birth-date-input">
        <div className="registration-input__birth-date-lable">
          Date of birthday:
        </div>
        <input
          id="first-name-input"
          type="date"
          placeholder="date of birthday"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default BirthDateInput;
