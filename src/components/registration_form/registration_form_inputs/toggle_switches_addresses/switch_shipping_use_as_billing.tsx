import React, { useState } from 'react';

function SwitchUseAsShipping() {
  const [isOnAsShipping, setIsOnAsShipping] = useState(false);

  const handleToggle = () => {
    setIsOnAsShipping(!isOnAsShipping);
  };

  return (
    <label
      className="registration-input__billing-as-shipping"
      htmlFor="billingAsShipping"
    >
      <input
        type="checkbox"
        id="billingAsShipping"
        checked={isOnAsShipping}
        onChange={handleToggle}
      />
      also use as billing address
    </label>
  );
}

export default SwitchUseAsShipping;
