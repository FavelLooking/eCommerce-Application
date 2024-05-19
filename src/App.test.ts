import { RegExps } from './types';
import * as loginRegex from './utils/constants';
import validateInput from './utils/validation';

describe('test validation on login page', () => {
  const emailValidationRegex: RegExps[] = [loginRegex.emailPattern];
  const emailError: string = loginRegex.emailPattern.error;
  const passwordValidationRegex: RegExps[] = [
    loginRegex.textLengthPattern,
    loginRegex.textLowerPattern,
    loginRegex.textNumberPattern,
    loginRegex.textSpacesPattern,
    loginRegex.textSymbolPattern,
    loginRegex.textUpperPattern,
  ];
  const spacesError: string = loginRegex.textSpacesPattern.error;
  const lengthError: string = loginRegex.textLengthPattern.error;
  const lowercaseError = loginRegex.textLowerPattern.error;
  const uppercaseError = loginRegex.textUpperPattern.error;
  const numberError = loginRegex.textNumberPattern.error;
  const symbolError = loginRegex.textSymbolPattern.error;

  test('should validate email', () => {
    // valid email
    expect(validateInput(emailValidationRegex, 'test@gmail.com')).toBe(true);
    // whitespace before email
    expect(validateInput(emailValidationRegex, ' test@gmail.com')).toBe(
      emailError
    );
    // whitespace in email
    expect(validateInput(emailValidationRegex, 'test @gmail.com')).toBe(
      emailError
    );
    // whitespace after email
    expect(validateInput(emailValidationRegex, 'test@gmail.com ')).toBe(
      emailError
    );
    // incorrect domain part
    expect(validateInput(emailValidationRegex, 'test@gmail')).toBe(emailError);
    // incorrect domain part
    expect(validateInput(emailValidationRegex, 'test@gmail.')).toBe(emailError);
    // incorrect domain part
    expect(validateInput(emailValidationRegex, 'test@gmail.c')).toBe(
      emailError
    );
    // incorrect domain part
    expect(validateInput(emailValidationRegex, 'test@.com')).toBe(emailError);
    // no prefix
    expect(validateInput(emailValidationRegex, '@.com')).toBe(emailError);
    // no @ character
    expect(validateInput(emailValidationRegex, 'test.com')).toBe(emailError);
    // two @ characters
    expect(validateInput(emailValidationRegex, 'te@st@.com')).toBe(emailError);
  });
  test('should validate password', () => {
    // valid password
    expect(validateInput(passwordValidationRegex, 'Qwerty123!')).toBe(true);
    // whitespace before password
    expect(validateInput(passwordValidationRegex, ' Qwerty123!')).toBe(
      spacesError
    );
    // whitespace in password
    expect(validateInput(passwordValidationRegex, ' Qwert y123!')).toBe(
      spacesError
    );
    // whitespace after password
    expect(validateInput(passwordValidationRegex, ' Qwerty123! ')).toBe(
      spacesError
    );
    // wrong length of password
    expect(validateInput(passwordValidationRegex, 'Qwerty')).toBe(lengthError);
    // no lowercase letter in password
    expect(validateInput(passwordValidationRegex, 'QQQQQ123!')).toBe(
      lowercaseError
    );
    // no uppercase letter in password
    expect(validateInput(passwordValidationRegex, 'qqqqqq123!')).toBe(
      uppercaseError
    );
    // no number in password
    expect(validateInput(passwordValidationRegex, 'Qwerty!!!!')).toBe(
      numberError
    );
    // no special symbol in password
    expect(validateInput(passwordValidationRegex, 'Qwerty1234')).toBe(
      symbolError
    );
  });
});
