import React from 'react';
import { BillingDefaultCheck } from '../../../../types/registration_form_types/registration_form_types';

function SwitchDefaultBilling({
  billingDefaultStatus,
  newState,
}: BillingDefaultCheck) {
  const handleToggle = () => {
    billingDefaultStatus(!newState);
  };

  return (
    <label
      className="registration-input__default-billing-switcher"
      htmlFor="defaultBilling"
    >
      <input
        type="checkbox"
        id="defaultBilling"
        checked={newState}
        onChange={handleToggle}
      />
      set as default address
    </label>
  );
}

export default SwitchDefaultBilling;
