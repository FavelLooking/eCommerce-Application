import React, { useState } from 'react';

function SwitchUseAsShipping() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <label
      className="registration-input__billing-as-shipping"
      htmlFor="billingAsShipping"
    >
      <input
        type="checkbox"
        id="billingAsShipping"
        checked={isOn}
        onChange={handleToggle}
      />
      set as default address
    </label>
  );
}

export default SwitchUseAsShipping;
