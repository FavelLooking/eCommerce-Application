import React from 'react';
import './profile.scss';
import { Customer } from '@commercetools/platform-sdk';

export default function ProfilePage() {
  const customerDetailsJSON = localStorage.getItem('customerDetails');

  if (!customerDetailsJSON) {
    return <div>No customer details found.</div>;
  }

  let customerDetailsObject;
  try {
    customerDetailsObject = JSON.parse(customerDetailsJSON);
  } catch (error) {
    return <div>Invalid customer details format.</div>;
  }

  const { firstName, lastName, dateOfBirth, addresses } =
    customerDetailsObject as Customer;

  return (
    <div className="profile-wrapper">
      <h1>Personal Information:</h1>
      <div className="personal-information">
        <span className="personal-information-line">
          <span className="label">First name:</span> {firstName}
        </span>
        <span className="personal-information-line">
          <span className="label">Last name:</span> {lastName}
        </span>
        <span className="personal-information-line">
          <span className="label">Date of birth:</span> {dateOfBirth}
        </span>
      </div>
      <h1>Addresses:</h1>
      <div className="addresses">
        {addresses.map(({ id, streetName, country, city, postalCode }) => (
          <div className="address-container" key={id}>
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
        ))}
      </div>
    </div>
  );
}
