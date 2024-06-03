import React, { useState, useEffect } from 'react';
import Toastify from 'toastify-js';
import './profile.scss';
import AddressProps from '../../interfaces/Address';
import validationInput from '../../utils/registration_form_utils/registration_form_validation_regex';
import {
  streetPatternRegistration,
  cityPatternRegistration,
  postalCodeFormatsRegistration,
  examplePostalCode,
} from '../../utils/registration_form_utils/registration_form_regex';
import CustomerService from '../../services/customerService';
import AuthService from '../../services/authService';
import { CountryType } from '../../types/registration_form_types/registration_form_types';

interface AddressInformationProps extends AddressProps {
  onSave: (updatedValues: AddressProps) => void;
  onDelete: (id: string) => void;
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
  onDelete,
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
  const [postalCodeValid, setPostalCodeValid] = useState(true);
  const [isDefaultShipping, setIsDefaultShipping] = useState(() =>
    isDefaultShippingAddress(id)
  );
  const [isDefaultBilling, setIsDefaultBilling] = useState(() =>
    isDefaultBillingAddress(id)
  );

  const showToast = (text: string) => {
    Toastify({
      text,
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();
  };

  const handleBillingChange = () => {
    if (isDefaultBilling) {
      CustomerService.setBillingAddress();
      showToast('Default billing address was unselected');
    } else {
      CustomerService.setBillingAddress(id);
      showToast('Default billing address was selected');
    }
    setIsDefaultBilling((prevState) => !prevState);
  };

  const handleShippingChange = () => {
    if (isDefaultShipping) {
      CustomerService.setShippingAddress();
      showToast('Default shipping address was unselected');
    } else {
      CustomerService.setShippingAddress(id);
      showToast('Default shipping address was selected');
    }
    setIsDefaultShipping((prevState) => !prevState);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleErrors = () => {
    const errorMessage = AuthService.getFromLocalStorage('ErrorMessage');
    if (errorMessage) {
      showToast(errorMessage);
    }
    AuthService.removeFromLocalStorage('ErrorMessage');
  };

  const handleDelete = async () => {
    try {
      await CustomerService.deleteAddress(id);
      onDelete(id);
      showToast('Address was deleted');
    } catch (error) {
      handleErrors();
    }
  };

  const handleAddAddress = async () => {
    try {
      if ((editedAddress.streetName, editedAddress.city)) {
        await CustomerService.addUserAddress(
          editedAddress.streetName as string,
          editedAddress.country,
          editedAddress.city,
          editedAddress.postalCode as string
        );
        onSave(editedAddress);
      }
      showToast('New address was added (but please refresh)');
    } catch (error) {
      handleErrors();
    }

    setIsEditing(false);
  };

  const handleSaveAddress = async () => {
    try {
      if ((editedAddress.streetName, editedAddress.city)) {
        CustomerService.updateUserAddress(
          editedAddress.id,
          editedAddress.streetName as string,
          editedAddress.country,
          editedAddress.city,
          editedAddress.postalCode as string
        );
        onSave(editedAddress);
      }
      showToast('Address was updated');
    } catch (error) {
      handleErrors();
    }

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
    if (name === 'postalCode') {
      const countryCode = editedAddress.country;
      if (
        countryCode === 'US' ||
        countryCode === 'CA' ||
        countryCode === 'RU' ||
        countryCode === 'GE'
      ) {
        const isValid = validationInput(
          postalCodeFormatsRegistration[countryCode],
          value
        );
        setPostalCodeValid(isValid);
      }
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getAddressClass = (addressId: string) => {
    if (
      isDefaultBillingAddress(addressId) &&
      isDefaultShippingAddress(addressId)
    ) {
      return 'default-billing default-shipping';
    }
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
              <div className="registration-error-address">
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
            <div className="registration-error-address">
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
          {!postalCodeValid && (
            <div className="registration-error-address">
              must follow the format for the {editedAddress.postalCode} postal
              code for example: &apos;
              {examplePostalCode[editedAddress.country as CountryType]}
              &apos;
            </div>
          )}
          <button
            type="button"
            className="button-address"
            onClick={handleSaveAddress}
            disabled={!streetValid || !cityValid || !postalCodeValid}
          >
            Save
          </button>
          <button
            type="button"
            className="button-address"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="button-address"
            onClick={handleAddAddress}
            disabled={!streetValid || !cityValid || !postalCodeValid}
          >
            Add new
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
          <div className="button-container">
            <button
              type="button"
              className="button-address"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="button-address"
              onClick={handleDelete}
            >
              Delete
            </button>
            <div className="radio-container">
              <input
                type="checkbox"
                className="checkbox"
                checked={isDefaultBilling}
                onChange={handleBillingChange}
              />{' '}
              Default Billing
              <input
                type="checkbox"
                className="checkbox"
                checked={isDefaultShipping}
                onChange={handleShippingChange}
              />{' '}
              Default Shipping
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddressComponent;
