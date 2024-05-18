import React, { useState } from 'react';

function SwitchDefaultBilling() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <label
      className="registration-input__default-billing-switcher"
      htmlFor="defaultBilling"
    >
      <input
        type="checkbox"
        id="defaultBilling"
        checked={isOn}
        onChange={handleToggle}
      />
      set as default address
    </label>
  );
}

export default SwitchDefaultBilling;
