import React, { useState } from 'react';

function EmailInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="registration-input email-input">
      <label htmlFor="email-input">
        <div className="registration-input__email-lable">email:</div>
        <input
          id="email-input"
          type="email"
          placeholder="email"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default EmailInput;
