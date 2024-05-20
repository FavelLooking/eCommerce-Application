import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../../../types/registration_form_types/registration_form_interfaces';
import validationInput from '../../../../utils/registration_form_utils/registration_form_validation_regex';
import { cityPatternRegistration } from '../../../../utils/registration_form_utils/registration_form_regex';

function ShippingCityInput({ onValidationChange }: InputStatus): JSX.Element {
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
      className="registration-input shipping-city-input"
      htmlFor="billing-city-input"
    >
      <p className="registration-input__shipping-city-lable">city:</p>
      <input
        id="shipping-city-input"
        name="shippingCity"
        type="text"
        placeholder="enter your city"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div className="registration-error">
          {cityPatternRegistration.error}
        </div>
      )}
    </label>
  );
}

export default ShippingCityInput;
