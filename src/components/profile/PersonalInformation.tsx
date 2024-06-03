import React, { useState } from 'react';
import Toastify from 'toastify-js';
import './profile.scss';
import CustomerDetails from '../../interfaces/personalInformation';
import validationInput from '../../utils/registration_form_utils/registration_form_validation_regex';
import {
  emailPatternRegistration,
  firstNamePatternRegistration,
  lastNamePatternRegistration,
} from '../../utils/registration_form_utils/registration_form_regex';
import CustomerService from '../../services/customerService';
import AuthService from '../../services/authService';

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
  const showToast = (text: string) => {
    Toastify({
      text,
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();
  };

  const handleErrors = () => {
    const errorMessage = AuthService.getFromLocalStorage('ErrorMessage');
    if (errorMessage) {
      showToast(errorMessage);
    }
    AuthService.removeFromLocalStorage('ErrorMessage');
  };

  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    firstName,
    lastName,
    dateOfBirth,
    email,
  });
  const [initialValues, setInitialValues] = useState({
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
    setEditedValues(initialValues);
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

  const handleSaveClick = async () => {
    try {
      if (editedValues.email)
        await CustomerService.updateUserInfo(
          editedValues.email,
          editedValues.firstName,
          editedValues.lastName,
          editedValues.dateOfBirth
        );
      onSave(editedValues);
      setEditing(false);
      setInitialValues(editedValues);
      showToast('User details were changed successfully');
    } catch (error) {
      handleErrors();
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="personal-information">
        <div className="personal-information-line">
          <span className="label">First name:</span>{' '}
          <input
            className="input-field"
            type="text"
            name="firstName"
            value={editedValues.firstName}
            onChange={handleChange}
          />
          {!firstNameValid && (
            <div className="registration-error error-personal">
              {firstNamePatternRegistration.error}
            </div>
          )}
        </div>
        <div className="personal-information-line">
          <span className="label">Last name:</span>{' '}
          <input
            className="input-field"
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
            className="input-field"
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
            className="input-field"
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
          className="button-address"
          onClick={handleSaveClick}
          disabled={!emailValid || !firstNameValid || !lastNameValid}
        >
          Save
        </button>
        <button type="button" className="button-address" onClick={handleCancel}>
          Cancel
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
      <button
        type="button"
        className="button-address"
        onClick={handleEditClick}
      >
        Edit
      </button>
    </div>
  );
}

export default PersonalInformation;
