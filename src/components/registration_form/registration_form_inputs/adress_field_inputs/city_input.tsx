import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../registration_form_interfaces';

function CityInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setInputValue(city);

    const cityRegex: RegExp = /^[a-zA-Z]+$/;
    const isValidCity = cityRegex.test(city);
    setIsValid(isValidCity);
    onValidationChange(isValidCity);
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
      {!isValid && (
        <div style={{ color: 'red' }}>
          must contain at least one character and no special characters or
          numbers
        </div>
      )}
    </label>
  );
}

export default CityInput;
