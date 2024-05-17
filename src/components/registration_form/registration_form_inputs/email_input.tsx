import React, { useState, ChangeEvent } from 'react';
import InputStatus from '../../../types/registration_form_types/registration_form_interfaces';
import validationInput from '../../../utils/registration_form_utils/registration_form_validation_regex';
import { emailPatternRegistration } from '../../../utils/registration_form_utils/registration_form_regex';

function EmailInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email: string = event.target.value;
    setInputValue(email);

    setIsValid(validationInput(emailPatternRegistration.regex, email));
    onValidationChange(validationInput(emailPatternRegistration.regex, email));
  };

  return (
    <label className="registration-input email-input" htmlFor="email-input">
      <p className="registration-input__email-lable">email:</p>
      <input
        id="email-input"
        type="text"
        placeholder="enter your email"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>{emailPatternRegistration.error}</div>
      )}
    </label>
  );
}

export default EmailInput;
