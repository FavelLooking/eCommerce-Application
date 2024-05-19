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

  describe('email', () => {
    test('should validate email', () => {
      expect(validateInput(emailValidationRegex, 'test@gmail.com')).toBe(true);
    });
    test('should throw an error if incorrect prefix-part', () => {
      expect(validateInput(emailValidationRegex, ' test@gmail.com')).toBe(
        emailError
      );
      expect(validateInput(emailValidationRegex, 'test @gmail.com')).toBe(
        emailError
      );
      expect(validateInput(emailValidationRegex, 'test@gmail.com ')).toBe(
        emailError
      );
    });
    test('should throw an error if incorrect domain part', () => {
      expect(validateInput(emailValidationRegex, 'test@gmail')).toBe(
        emailError
      );
      expect(validateInput(emailValidationRegex, 'test@gmail.')).toBe(
        emailError
      );
      expect(validateInput(emailValidationRegex, 'test@gmail.c')).toBe(
        emailError
      );
      expect(validateInput(emailValidationRegex, 'test@.com')).toBe(emailError);
      expect(validateInput(emailValidationRegex, '@.com')).toBe(emailError);
      expect(validateInput(emailValidationRegex, 'test.com')).toBe(emailError);
      expect(validateInput(emailValidationRegex, 'te@st@.com')).toBe(
        emailError
      );
    });
  });

  describe('password', () => {
    test('should validate password', () => {
      expect(validateInput(passwordValidationRegex, 'Qwerty123!')).toBe(true);
    });
    test('should throw an error if password contains whitespaces', () => {
      expect(validateInput(passwordValidationRegex, ' Qwerty123!')).toBe(
        spacesError
      );
      expect(validateInput(passwordValidationRegex, ' Qwert y123!')).toBe(
        spacesError
      );
      expect(validateInput(passwordValidationRegex, ' Qwerty123! ')).toBe(
        spacesError
      );
    });
    test('should throw an error if password length is incorrect', () => {
      expect(validateInput(passwordValidationRegex, 'Qwerty')).toBe(
        lengthError
      );
    });
    test('should throw an error if password not contains at least one lowercase english letter', () => {
      expect(validateInput(passwordValidationRegex, 'QQQQQ123!')).toBe(
        lowercaseError
      );
    });
    test('should throw an error if password not contains at least one uppercase english letter', () => {
      expect(validateInput(passwordValidationRegex, 'qqqqqq123!')).toBe(
        uppercaseError
      );
    });
    test('should throw an error if password not contains at least one number', () => {
      expect(validateInput(passwordValidationRegex, 'Qwerty!!!!')).toBe(
        numberError
      );
    });
    test('should throw an error if password not contains at least one special symbol !@#$%^&*', () => {
      expect(validateInput(passwordValidationRegex, 'Qwerty1234')).toBe(
        symbolError
      );
    });
  });
});
