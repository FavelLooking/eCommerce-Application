import React, { useState } from 'react';
import './profile.scss';
import CustomerDetails from '../../interfaces/personalInformation';

function PersonalInformation(props: CustomerDetails): JSX.Element {
  const { firstName, lastName, dateOfBirth, email } = props;
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    firstName,
    lastName,
    dateOfBirth,
    email,
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="personal-information">
        <div className="personal-information-line">
          <span className="label">First name:</span>{' '}
          <input
            type="text"
            name="firstName"
            value={editedValues.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="personal-information-line">
          <span className="label">Last name:</span>{' '}
          <input
            type="text"
            name="lastName"
            value={editedValues.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="personal-information-line">
          <span className="label">Date of birth:</span>{' '}
          <input
            type="date"
            name="dateOfBirth"
            value={editedValues.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="personal-information-line">
          <span className="label">Email:</span>{' '}
          <input
            type="email"
            name="email"
            value={editedValues.email}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="personal-information">
      <div className="personal-information-line">
        <span className="label">First name:</span> {firstName}
      </div>
      <div className="personal-information-line">
        <span className="label">Last name:</span> {lastName}
      </div>
      <div className="personal-information-line">
        <span className="label">Date of birth:</span> {dateOfBirth}
      </div>
      <div className="personal-information-line">
        <span className="label">Email:</span> {email}
      </div>
      <button type="button" className="button" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
}

export default PersonalInformation;
