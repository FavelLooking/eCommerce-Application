import React, { useState } from 'react';

function CityInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="registration-input city-input">
      <label htmlFor="city-input">
        <div className="registration-input__city-lable">city:</div>
        <input
          id="city-input"
          type="text"
          placeholder="city"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default CityInput;
