import React, { useState } from 'react';

function SwitchDefaultShipping() {
  const [isOnShipping, setIsOnShipping] = useState(false);

  const handleToggle = () => {
    setIsOnShipping(!isOnShipping);
  };

  return (
    <label
      className="registration-input__default-shipping-switcher"
      htmlFor="defaultShipping"
    >
      <input
        type="checkbox"
        id="defaultShipping"
        checked={isOnShipping}
        onChange={handleToggle}
      />
      set as default address
    </label>
  );
}

export default SwitchDefaultShipping;
