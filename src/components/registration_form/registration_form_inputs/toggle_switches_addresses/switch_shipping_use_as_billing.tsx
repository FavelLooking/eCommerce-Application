import React, { useState } from 'react';

function SwitchDefaultBilling() {
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
      also use as billing address
    </label>
  );
}

export default SwitchDefaultBilling;
