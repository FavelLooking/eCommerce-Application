import React, { ChangeEvent, useState } from 'react';

function CityInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const city = event.target.value;
    setInputValue(city);

    const cityRegex: RegExp = /\S/;
    setIsValid(cityRegex.test(city));
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
          style={{ borderColor: isValid ? 'initial' : 'red' }}
        />
      </label>
    </div>
  );
}

export default CityInput;
