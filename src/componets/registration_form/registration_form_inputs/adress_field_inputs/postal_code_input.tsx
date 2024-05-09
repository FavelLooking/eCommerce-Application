import React, { useState } from 'react';

function PostalCodeInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="registration-input postal-code-input">
      <label htmlFor="postal-code-input">
        <div className="registration-input__postal-code-lable">
          postal code:
        </div>
        <input
          id="postal-code-inpur"
          type="text"
          placeholder="postal-code"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default PostalCodeInput;
