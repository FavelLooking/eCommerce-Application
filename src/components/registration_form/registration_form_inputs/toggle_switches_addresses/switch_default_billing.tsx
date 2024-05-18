import React, { useState } from 'react';

function SwitchDefaultBilling() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <label htmlFor="defaultBilling">
      <input
        type="checkbox"
        id="defaultBilling"
        checked={isOn}
        onChange={handleToggle}
      />
      default billing
    </label>
  );
}

export default SwitchDefaultBilling;
