import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../../types/registration_form_types/registration_form_interfaces';
import checkAge from '../../../utils/registration_form_utils/check_age';

function BirthDateInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentBirthDate: string = event.target.value;
    setInputValue(currentBirthDate);

    setIsValid(checkAge(currentBirthDate));
    onValidationChange(checkAge(currentBirthDate));
  };

  return (
    <label
      className="registration-input birth-date-input"
      htmlFor="birth-date-input"
    >
      <p className="registration-input__birth-date-lable">Date of birthday:</p>
      <input
        id="first-name-input"
        type="date"
        placeholder="date of birthday"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>
          You should be at least 13 years old to register
        </div>
      )}
    </label>
  );
}

export default BirthDateInput;
