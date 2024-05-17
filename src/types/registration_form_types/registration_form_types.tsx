export type CountryType = 'GE' | 'CA' | 'RU' | 'US';

export type CountryInputCheck = {
  selectedCountry: string;
  changeCountry: (str: string) => void;
};
