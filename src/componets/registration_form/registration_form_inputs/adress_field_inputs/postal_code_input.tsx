import React, { ChangeEvent, useState } from 'react';

function PostalCodeInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const postalCode = event.target.value;
    setInputValue(postalCode);

    const postalCodeFormats = {
      US: /^\d{5}$/,
      CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
      RU: /^\d{6}$/,
      GE: /^\d{4}$/,
    };

    const country = 'GE';

    setIsValid(postalCodeFormats[country].test(postalCode.trim()));
  };

  return (
    <label
      className="registration-input postal-code-input"
      htmlFor="postal-code-input"
    >
      <p className="registration-input__postal-code-lable">postal code:</p>
      <input
        id="postal-code-inpur"
        type="text"
        placeholder="postal-code"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
    </label>
  );
}

export default PostalCodeInput;
