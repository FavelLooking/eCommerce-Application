import React from 'react';
import CustomerDetails from '../../interfaces/personalInformation';

function PersonalInformation(props: CustomerDetails): JSX.Element {
  const { firstName, lastName, dateOfBirth } = props;

  return (
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
  );
}

export default PersonalInformation;
