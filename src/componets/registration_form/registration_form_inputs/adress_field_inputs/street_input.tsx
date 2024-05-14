import React, { ChangeEvent, useState } from 'react';

function StreetInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const street = event.target.value;
    setInputValue(street);

    const streetRegex: RegExp = /\S/;
    setIsValid(streetRegex.test(street));
  };

  return (
    <div className="registration-input street-input">
      <label htmlFor="street-input">
        <div className="registration-input__street-lable">street:</div>
        <input
          id="street-input"
          type="text"
          placeholder="street"
          value={inputValue}
          onChange={handleChange}
          style={{ borderColor: isValid ? 'initial' : 'red' }}
        />
      </label>
    </div>
  );
}

export default StreetInput;
