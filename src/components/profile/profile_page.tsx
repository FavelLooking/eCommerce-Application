import React, { useEffect, useState } from 'react';
import './profile.scss';
import { Customer } from '@commercetools/platform-sdk';
import CustomerService from '../../services/customerService';
import PersonalInformation from './PersonalInformation';
import Address from './Address';

export default function ProfilePage() {
  const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);
  const [errorOccurred, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiResponse = await CustomerService.getCustomersDetails();
        setCustomerDetails(apiResponse.body);
      } catch (error) {
        setError('Failed to fetch customer details');
      }
    };

    fetchDetails();
  }, []);

  if (errorOccurred) {
    return <div>{errorOccurred}</div>;
  }

  if (!customerDetails) {
    return <div>No user Information</div>;
  }

  const { firstName, lastName, dateOfBirth, addresses } =
    customerDetails as Customer;

  const isDefaultBillingAddress = (id: string): boolean =>
    customerDetails?.defaultBillingAddressId === id;

  const isDefaultShippingAddress = (id: string): boolean =>
    customerDetails?.defaultShippingAddressId === id;

  const isBillingAddress = (id: string): boolean =>
    customerDetails?.billingAddressIds?.includes(id) ?? false;

  const isShippingAddress = (id: string): boolean =>
    customerDetails?.shippingAddressIds?.includes(id) ?? false;

  const getAddressClass = (id: string) => {
    if (isDefaultShippingAddress(id)) return 'default-shipping';
    if (isDefaultBillingAddress(id)) return 'default-billing';
    return '';
  };

  const getTypeAddressClass = (id: string) => {
    if (isShippingAddress(id)) return 'type-shipping';
    if (isBillingAddress(id)) return 'type-billing';
    return '';
  };

  return (
    <div className="profile-wrapper">
      <h1 className="title">Personal Information:</h1>
      <PersonalInformation
        firstName={firstName}
        lastName={lastName}
        dateOfBirth={dateOfBirth}
      />
      <h1 className="title">Addresses:</h1>
      <div className="addresses">
        {addresses.map(({ id, streetName, country, city, postalCode }) => (
          <Address
            id={id}
            streetName={streetName}
            country={country}
            city={city}
            postalCode={postalCode}
            getTypeAddressClass={getTypeAddressClass}
            getAddressClass={getAddressClass}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
