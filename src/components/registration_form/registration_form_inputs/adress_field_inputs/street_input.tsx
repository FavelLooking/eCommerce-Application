import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../registration_form_interfaces';

function StreetInput({ onValidationChange }: InputStatus) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const street = event.target.value;
    setInputValue(street);

    const streetRegex: RegExp = /\S/;
    const isValidStreet = streetRegex.test(street);
    setIsValid(isValidStreet);
    onValidationChange(isValidStreet);
  };

  return (
    <label className="registration-input street-input" htmlFor="street-input">
      <p className="registration-input__street-lable">street:</p>
      <input
        id="street-input"
        type="text"
        placeholder="street"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>must contain at least one character</div>
      )}
    </label>
  );
}

export default StreetInput;
