import { CountryType } from '../../registration_form_types';

let country: CountryType = 'GE';

export function getCountry(): CountryType {
  return country;
}

export function setCountry(newCountry: CountryType) {
  country = newCountry;
}
