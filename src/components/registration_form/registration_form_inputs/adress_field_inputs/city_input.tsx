import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../registration_form_interfaces';
import validationInput from '../../registration_form_validation_regex';
import { cityPatternRegistration } from '../../registration_form_regex';

function CityInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setInputValue(city);

    setIsValid(validationInput(cityPatternRegistration.regex, city));
    onValidationChange(validationInput(cityPatternRegistration.regex, city));
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
        <div style={{ color: 'red' }}>{cityPatternRegistration.error}</div>
      )}
    </label>
  );
}

export default CityInput;
