import React, { ChangeEvent, useState } from 'react';
import minAge from './birth_date_input_min_age';

function BirthDateInput(): JSX.Element {
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
    </label>
  );
}

export default BirthDateInput;
