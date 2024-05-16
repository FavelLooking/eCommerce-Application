import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../../types/registration_form_types/registration_form_interfaces';
import validationInput from '../../../utils/registration_form_utils/registration_form_validation_regex';
import { firstNamePatternRegistration } from '../../../utils/registration_form_utils/registration_form_regex';

function FirstNameInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const firstName: string = event.target.value;
    setInputValue(firstName);

    setIsValid(validationInput(firstNamePatternRegistration.regex, firstName));
    onValidationChange(
      validationInput(firstNamePatternRegistration.regex, firstName)
    );
  };

  return (
    <label
      className="registration-input first-name-input"
      htmlFor="first-name-input"
    >
      <p className="registration-input__first-name-lable">First name:</p>
      <input
        id="first-name-input"
        type="text"
        placeholder="First name"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>{firstNamePatternRegistration.error}</div>
      )}
    </label>
  );
}

export default FirstNameInput;
