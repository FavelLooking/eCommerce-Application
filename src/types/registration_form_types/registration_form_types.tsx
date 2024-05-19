export type CountryType = 'GE' | 'CA' | 'RU' | 'US';

export type CountryInputCheckBilling = {
  selectedCountry: string;
  billingChangeCountry: (str: string) => void;
};

export type CountryInputCheckShipping = {
  selectedCountry: string;
  shippingChangeCountry: (str: string) => void;
};

export type ShippingDefaultCheck = {
  shippingDefaultStatus: (newState: boolean) => boolean;
  newState: boolean;
};

export type BillingDefaultCheck = {
  billingDefaultStatus: (newState: boolean) => boolean;
  newState: boolean;
};

export type UseAsShippingCheck = {
  asShipingStatus: (newState: boolean) => boolean;
  newState: boolean;
};
