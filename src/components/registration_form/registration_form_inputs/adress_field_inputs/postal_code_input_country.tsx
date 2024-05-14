import Country from '../../registration_form_types';

let country: Country = 'GE';

export function getCountry(): Country {
  return country;
}

export function setCountry(newCountry: Country) {
  country = newCountry;
}
