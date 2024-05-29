import React from 'react';
import './profile.scss';

export default function ProfilePage() {
  const customerDetailsJSON = localStorage.getItem('customerDetails');

  if (!customerDetailsJSON) {
    return <div>No customer details found.</div>;
  }

  let customerDetailsObject;
  try {
    customerDetailsObject = JSON.parse(customerDetailsJSON);
  } catch (error) {
    console.error('Failed to parse customer details:', error);
    return <div>Invalid customer details format.</div>;
  }

  const {
    firstName,
    lastName,
    dateOfBirth,
    addresses: [{ streetName, postalCode, city, country }],
  } = customerDetailsObject;

  return (
    <div className="profile-wrapper">
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
      <div className="addresses">
        <div className="address-container">
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
      </div>
    </div>
  );
}
