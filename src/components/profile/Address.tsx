import React, { useState, useEffect } from 'react';
import './profile.scss';
import AddressProps from '../../interfaces/Address';
import validationInput from '../../utils/registration_form_utils/registration_form_validation_regex';
import {
  streetPatternRegistration,
  cityPatternRegistration,
} from '../../utils/registration_form_utils/registration_form_regex';

interface AddressInformationProps extends AddressProps {
  onSave: (updatedValues: AddressProps) => void;
  id: string | undefined;
}

function AddressComponent({
  id = '',
  streetName,
  country,
  city,
  postalCode,
  isDefaultShippingAddress,
  isDefaultBillingAddress,
  isShippingAddress,
  isBillingAddress,
  onSave,
}: AddressInformationProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    id,
    streetName,
    country,
    city,
    postalCode,
    isDefaultShippingAddress,
    isDefaultBillingAddress,
    isShippingAddress,
    isBillingAddress,
  });

  useEffect(() => {
    setEditedAddress((prevState) => ({
      ...prevState,
      streetName,
      country,
      city,
      postalCode,
    }));
  }, [streetName, country, city, postalCode]);

  const [streetValid, setIsStreetValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSaveAddress = () => {
    onSave(editedAddress);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'streetName') {
      const isValid = validationInput(streetPatternRegistration.regex, value);
      setIsStreetValid(isValid);
    }
    if (name === 'city') {
      const isValid = validationInput(cityPatternRegistration.regex, value);
      setCityValid(isValid);
    }
    // if (name === 'postalCode') {
    //   const isValid = validationInput(
    //     postalCodeFormatsRegistration.regex,
    //     value
    //   );
    //   setPostalCodeValid(isValid);
    // }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
      {isEditing ? (
        <div className="address-information">
          <div className="address-information-line">
            <span className="label"> Street:</span>{' '}
            <input
              className="input-field input-address"
              type="text"
              name="streetName"
              value={editedAddress.streetName}
              onChange={handleChange}
            />
            {!streetValid && (
              <div className="registration-error">
                {streetPatternRegistration.error}
              </div>
            )}
          </div>
          <div className="address-information-line">
            <span className="label"> Country:</span>{' '}
            <select
              className="input-field input-address"
              name="country"
              value={editedAddress.country}
              onChange={handleSelectChange}
            >
              <option value="GE">Georgia</option>
              <option value="US">USA</option>
              <option value="RU">Russia</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div className="address-information-line">
            <span className="label"> City:</span>{' '}
            <input
              className="input-field input-address"
              type="text"
              name="city"
              value={editedAddress.city}
              onChange={handleChange}
            />
          </div>
          {!cityValid && (
            <div className="registration-error">
              {cityPatternRegistration.error}
            </div>
          )}
          <div className="address-information-line">
            <span className="label"> Postal code:</span>{' '}
            <input
              className="input-field input-address"
              type="text"
              name="postalCode"
              value={editedAddress.postalCode}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="button" onClick={handleSaveAddress}>
            Save
          </button>
          <button type="button" className="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <>
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
          <button type="button" className="button" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default AddressComponent;
