import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../../../types/registration_form_types/registration_form_interfaces';
import validationInput from '../../../../utils/registration_form_utils/registration_form_validation_regex';
import { cityPatternRegistration } from '../../../../utils/registration_form_utils/registration_form_regex';

function BillingCityInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setInputValue(city);

    setIsValid(validationInput(cityPatternRegistration.regex, city));
    onValidationChange(validationInput(cityPatternRegistration.regex, city));
  };

  return (
    <label
      className="registration-input billing-city-input"
      htmlFor="billing-city-input"
    >
      <p className="registration-input__billing-city-lable">city:</p>
      <input
        id="billing-city-input"
        name="billing-city"
        type="text"
        placeholder="enter your city"
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

export default BillingCityInput;
