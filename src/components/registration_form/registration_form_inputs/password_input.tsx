import React, { ChangeEvent, useState } from 'react';
import InputStatus from '../../../types/registration_form_types/registration_form_interfaces';
import validationInput from '../../../utils/registration_form_utils/registration_form_validation_regex';
import { passwordPatternRegistration } from '../../../utils/registration_form_utils/registration_form_regex';

function PasswordInput({ onValidationChange }: InputStatus): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password: string = event.target.value;
    setInputValue(password);

    setIsValid(validationInput(passwordPatternRegistration.regex, password));
    onValidationChange(
      validationInput(passwordPatternRegistration.regex, password)
    );
  };

  return (
    <label
      className="registration-input password-input"
      htmlFor="password-input"
    >
      <p className="registration-input__password-lable">password:</p>
      <input
        id="password-input"
        type="text"
        name="password"
        placeholder="enter your password"
        value={inputValue}
        onChange={handleChange}
        style={{ borderColor: isValid ? 'initial' : 'red' }}
      />
      {!isValid && (
        <div style={{ color: 'red' }}>{passwordPatternRegistration.error}</div>
      )}
    </label>
  );
}

export default PasswordInput;
