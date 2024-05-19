import React from 'react';
import { ShippingDefaultCheck } from '../../../../types/registration_form_types/registration_form_types';

function SwitchDefaultShipping({
  shippingDefaultStatus,
  newState,
}: ShippingDefaultCheck) {
  const handleToggle = () => {
    shippingDefaultStatus(!newState);
  };

  return (
    <label
      className="registration-input__default-shipping-switcher"
      htmlFor="defaultShipping"
    >
      <input
        type="checkbox"
        id="defaultShipping"
        checked={newState}
        onChange={handleToggle}
      />
      set as default address
    </label>
  );
}

export default SwitchDefaultShipping;
