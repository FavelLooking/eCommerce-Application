import React, { useState } from 'react';
import './profile.scss';
import CustomerDetails from '../../interfaces/personalInformation';
import validationInput from '../../utils/registration_form_utils/registration_form_validation_regex';
import {
  emailPatternRegistration,
  firstNamePatternRegistration,
  lastNamePatternRegistration,
} from '../../utils/registration_form_utils/registration_form_regex';

interface PersonalInformationProps extends CustomerDetails {
  onSave: (updatedValues: CustomerDetails) => void;
}

function PersonalInformation({
  firstName,
  lastName,
  dateOfBirth,
  email,
  onSave,
}: PersonalInformationProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    firstName,
    lastName,
    dateOfBirth,
    email,
  });
  const [emailValid, setIsEmailValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [birthDateValid, setBirthDateValid] = useState(true);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: value,
    });
    if (name === 'email') {
      const isValid = validationInput(emailPatternRegistration.regex, value);
      setIsEmailValid(isValid);
    }
    if (name === 'firstName') {
      const isValid = validationInput(
        firstNamePatternRegistration.regex,
        value
      );
      setFirstNameValid(isValid);
    }
    if (name === 'lastName') {
      const isValid = validationInput(lastNamePatternRegistration.regex, value);
      setLastNameValid(isValid);
    }
    if (name === 'dateOfBirth') {
      const isValid = validationInput(lastNamePatternRegistration.regex, value);
      setBirthDateValid(isValid);
    }
  };

  const handleSaveClick = () => {
    onSave(editedValues);
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
          {!firstNameValid && (
            <div className="registration-error">
              {firstNamePatternRegistration.error}
            </div>
          )}
        </div>
        <div className="personal-information-line">
          <span className="label">Last name:</span>{' '}
          <input
            type="text"
            name="lastName"
            value={editedValues.lastName}
            onChange={handleChange}
          />
          {!lastNameValid && (
            <div className="registration-error">
              {lastNamePatternRegistration.error}
            </div>
          )}
        </div>
        <div className="personal-information-line">
          <span className="label">Date of birth:</span>{' '}
          <input
            type="date"
            name="dateOfBirth"
            value={editedValues.dateOfBirth}
            onChange={handleChange}
          />
          {!birthDateValid && (
            <div className="registration-error">
              you should be at least 13 years old to register
            </div>
          )}
        </div>
        <div className="personal-information-line">
          <span className="label">Email:</span>{' '}
          <input
            type="email"
            name="email"
            value={editedValues.email}
            onChange={handleChange}
          />
          {!emailValid && (
            <div className="registration-error">
              {emailPatternRegistration.error}
            </div>
          )}
        </div>
        <button
          type="button"
          className="button"
          onClick={handleSaveClick}
          disabled={!emailValid || !firstNameValid || !lastNameValid}
        >
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
