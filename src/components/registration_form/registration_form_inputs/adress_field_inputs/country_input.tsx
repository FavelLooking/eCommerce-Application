import React, { ChangeEvent, useState } from 'react';

function CountryInput() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    setIsValid(selectedValue !== '');
  };

  return (
    <div className="registration-input country-select">
      <p className="registration-input__country-lable">country:</p>
      <select
        id="country-input"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select Country</option>
        <option value="US">USA</option>
        <option value="GE">Georgia</option>
        <option value="RU">Russia</option>
        <option value="BE">Belarus</option>
      </select>
      {!isValid && <div style={{ color: 'red' }}>Please select a country</div>}
    </div>
  );
}

export default CountryInput;
