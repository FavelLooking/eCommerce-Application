import React, { ChangeEvent, useState } from 'react';

function CountryInput() {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
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
        <option value="USA">USA</option>
        <option value="Georgia">Georgia</option>
        <option value="Russia">Russia</option>
        <option value="Belarus">Belarus</option>
      </select>
    </div>
  );
}

export default CountryInput;
