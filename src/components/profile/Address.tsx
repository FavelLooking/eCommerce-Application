import React from 'react';
import AddressProps from '../../interfaces/Address';

function AddressComponent(props: AddressProps): JSX.Element {
  const {
    id = '',
    streetName,
    country,
    city,
    postalCode,
    isDefaultShippingAddress,
    isDefaultBillingAddress,
    isShippingAddress,
    isBillingAddress,
  } = props;
  const getAddressClass = (addressId: string) => {
    if (isDefaultShippingAddress(addressId)) return 'default-shipping';
    if (isDefaultBillingAddress(addressId)) return 'default-billing';
    return '';
  };

  const getTypeAddressClass = (addressId: string) => {
    if (isShippingAddress(addressId)) return 'type-shipping';
    if (isBillingAddress(addressId)) return 'type-billing';
    return '';
  };

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
