import React, { ChangeEvent, useState } from 'react';

function CityInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const city = event.target.value;
    setInputValue(city);

    const cityRegex: RegExp = /^[a-zA-Z]+$/;
    setIsValid(cityRegex.test(city.trim()));
  };

  return (
    <label className="registration-input city-input" htmlFor="city-input">
      <p className="registration-input__city-lable">city:</p>
      <input
        id="city-input"
        type="text"
        placeholder="city"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
    </label>
  );
}

export default CityInput;
