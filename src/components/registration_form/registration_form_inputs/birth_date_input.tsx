import React, { ChangeEvent, useState } from 'react';
import minAge from './birth_date_input_min_age';
import InputStatus from '../registration_form_interfaces';

function BirthDateInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentBirthDate: string = event.target.value;
    setInputValue(currentBirthDate);

    const currentDate = new Date();
    const birthDate = new Date(currentBirthDate);
    const diffYears = currentDate.getFullYear() - birthDate.getFullYear();
    const isOldEnough =
      diffYears > minAge ||
      (diffYears === minAge &&
        currentDate.getMonth() >= birthDate.getMonth() &&
        currentDate.getDate() >= birthDate.getDate());

    setIsValid(isOldEnough);
    onValidationChange(isOldEnough);
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
      {!isValid && <div style={{ color: 'red' }}>13 years old or older</div>}
    </label>
  );
}

export default BirthDateInput;
