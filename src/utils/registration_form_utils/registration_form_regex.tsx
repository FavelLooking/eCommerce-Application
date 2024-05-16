export const cityPatternRegistration = {
  regex: /^[a-zA-Z]+$/,
  error:
    'must contain at least one character and no special characters or numbers',
};

export const passwordPatternRegistration = {
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  error: `password must contains minimum 8 characters,
    at least 1 uppercase letter,
    1 lowercase letter,
    1 number
    and no spaces`,
};

export const lastNamePatternRegistration = {
  regex: /^[a-zA-Z]+$/,
  error:
    'must contain at least one character and no special characters or numbers',
};

export const firstNamePatternRegistration = {
  regex: /^[a-zA-Z]+$/,
  error:
    'must contain at least one character and no special characters or numbers',
};

export const emailPatternRegistration = {
  regex: /^\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  error: 'enter correct email',
};

export const streetPatternRegistration = {
  regex: /\S/,
  error: 'must contain at least one character',
};

export const postalCodeFormatsRegistration = {
  US: /^\d{5}(?:-\d{4})?$/,
  CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
  RU: /^\d{6}$/,
  GE: /^\d{4}$/,
};

export const examplePostalCode = {
  US: '45678 or 83703-83728',
  CA: 'K1A 0B1',
  RU: '435156',
  GE: '5683',
};
