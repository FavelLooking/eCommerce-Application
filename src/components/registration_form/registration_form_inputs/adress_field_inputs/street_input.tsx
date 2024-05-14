import React, { ChangeEvent, useState } from 'react';

function StreetInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const street = event.target.value;
    setInputValue(street);

    const streetRegex: RegExp = /\S/;
    setIsValid(streetRegex.test(street));
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
    </label>
  );
}

export default StreetInput;
