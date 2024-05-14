import React, { ChangeEvent, useState } from 'react';

function BirthDateInput(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentBirthDate: string = event.target.value;
    setInputValue(currentBirthDate);

    const currentDate = new Date();
    const birthDate = new Date(currentBirthDate);
    const minAge = 13;
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
      <div className="registration-input__birth-date-lable">
        Date of birthday:
      </div>
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
