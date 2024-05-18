import React, { useState } from 'react';

function SwitchDefaultBilling() {
  const [isOnBilling, setIsOnBilling] = useState(false);

  const handleToggle = () => {
    setIsOnBilling(!isOnBilling);
  };

  return (
    <label
      className="registration-input__default-billing-switcher"
      htmlFor="defaultBilling"
    >
      <input
        type="checkbox"
        id="defaultBilling"
        checked={isOnBilling}
        onChange={handleToggle}
      />
      set as default address
    </label>
  );
}

export default SwitchDefaultBilling;
