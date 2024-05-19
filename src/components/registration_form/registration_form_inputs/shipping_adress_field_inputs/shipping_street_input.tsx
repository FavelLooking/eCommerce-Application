import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../../../types/registration_form_types/registration_form_interfaces';
import validationInput from '../../../../utils/registration_form_utils/registration_form_validation_regex';
import { streetPatternRegistration } from '../../../../utils/registration_form_utils/registration_form_regex';

function ShippingStreetInput({ onValidationChange }: InputStatus) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const street = event.target.value;
    setInputValue(street);

    setIsValid(validationInput(streetPatternRegistration.regex, street));
    onValidationChange(
      validationInput(streetPatternRegistration.regex, street)
    );
  };

  return (
    <label
      className="registration-input shipping-street-input"
      htmlFor="shipping-street-input"
    >
      <p className="registration-input__shipping-street-lable">street:</p>
      <input
        id="shipping-street-input"
        type="text"
        placeholder="enter your street"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>{streetPatternRegistration.error}</div>
      )}
    </label>
  );
}

export default ShippingStreetInput;
