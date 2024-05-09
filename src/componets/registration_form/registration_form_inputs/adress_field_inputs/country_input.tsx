import React, { ChangeEvent, useState } from 'react';

function CountryInput() {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="registration-input street-input">
      <div className="country-select">
        <div className="registration-input__country-lable">country:</div>
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
    </div>
  );
}

export default CountryInput;
