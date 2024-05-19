import React from 'react';
import { UseAsShippingCheck } from '../../../../types/registration_form_types/registration_form_types';

function SwitchUseAsShipping({
  asShipingStatus,
  newState,
}: UseAsShippingCheck) {
  const handleToggle = () => {
    asShipingStatus(!newState);
  };

  return (
    <label
      className="registration-input__billing-as-shipping"
      htmlFor="billingAsShipping"
    >
      <input
        type="checkbox"
        id="billingAsShipping"
        checked={newState}
        onChange={handleToggle}
      />
      also use as billing address
    </label>
  );
}

export default SwitchUseAsShipping;
