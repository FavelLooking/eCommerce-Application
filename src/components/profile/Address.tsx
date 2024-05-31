import React from 'react';
import { Address } from '@commercetools/platform-sdk';

interface AddressProps extends Address {
  getTypeAddressClass: (id: string) => string;
  getAddressClass: (id: string) => string;
}

function AddressComponent({
  id = '',
  streetName,
  country,
  city,
  postalCode,
  getTypeAddressClass,
  getAddressClass,
}: AddressProps): JSX.Element {
  return (
    <div
      className={`${getTypeAddressClass(id)} address-container ${getAddressClass(id)}`}
      key={id}
    >
      <span className="address-information-line">
        <span className="label">Street:</span> {streetName}
      </span>
      <span className="address-information-line">
        <span className="label">Country:</span> {country}
      </span>
      <span className="address-information-line">
        <span className="label">City:</span> {city}
      </span>
      <span className="address-information-line">
        <span className="label">Postal code:</span> {postalCode}
      </span>
    </div>
  );
}

export default AddressComponent;
