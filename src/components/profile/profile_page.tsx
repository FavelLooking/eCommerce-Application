import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './profile.scss';
import { Customer } from '@commercetools/platform-sdk';
import CustomerService from '../../services/customerService';
import PersonalInformation from './PersonalInformation';
import AddressComponent from './Address';

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
    return <Navigate to="not-found" replace />;
  }

  if (!customerDetails) {
    return <div className="loading">Loading...</div>;
  }

  const {
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    defaultBillingAddressId,
    defaultShippingAddressId,
    billingAddressIds,
    shippingAddressIds,
  } = customerDetails as Customer;

  const isDefaultBillingAddress = (id: string): boolean =>
    defaultBillingAddressId === id;

  const isDefaultShippingAddress = (id: string): boolean =>
    defaultShippingAddressId === id;

  const isBillingAddress = (id: string): boolean =>
    billingAddressIds?.includes(id) ?? false;

  const isShippingAddress = (id: string): boolean =>
    shippingAddressIds?.includes(id) ?? false;

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
          <AddressComponent
            id={id}
            streetName={streetName}
            country={country}
            city={city}
            postalCode={postalCode}
            isDefaultShippingAddress={isDefaultShippingAddress}
            isDefaultBillingAddress={isDefaultBillingAddress}
            isShippingAddress={isShippingAddress}
            isBillingAddress={isBillingAddress}
            key={id}
          />
        ))}
      </div>
    </div>
  );
}
