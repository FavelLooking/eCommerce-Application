import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './profile.scss';
import { Customer } from '@commercetools/platform-sdk';
import CustomerService from '../../services/customerService';
import PersonalInformation from './PersonalInformation';
import AddressComponent from './Address';

export default function ProfilePage() {
  const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiResponse = await CustomerService.getCustomersDetails();
        setCustomerDetails(apiResponse.body);
      } catch (error) {
        navigate('not-found', { replace: true });
      }
      return undefined;
    };

    fetchDetails();
  }, [navigate]);

  if (!customerDetails) {
    return <div className="loading">Loading...</div>;
  }

  const isDefaultBillingAddress = (id: string): boolean =>
    customerDetails.defaultBillingAddressId === id;

  const isDefaultShippingAddress = (id: string): boolean =>
    customerDetails.defaultShippingAddressId === id;

  const isBillingAddress = (id: string): boolean =>
    customerDetails.billingAddressIds?.includes(id) ?? false;

  const isShippingAddress = (id: string): boolean =>
    customerDetails.shippingAddressIds?.includes(id) ?? false;

  return (
    <div className="profile-wrapper">
      <h1 className="title">Personal Information:</h1>
      <PersonalInformation
        firstName={customerDetails.firstName}
        lastName={customerDetails.lastName}
        dateOfBirth={customerDetails.dateOfBirth}
      />
      <h1 className="title">Addresses:</h1>
      <div className="addresses">
        {customerDetails.addresses.map(
          ({ id, streetName, country, city, postalCode }) => (
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
          )
        )}
      </div>
      <Link to="change-password">
        <button type="button" className="button">
          Change Password
        </button>
      </Link>
    </div>
  );
}
