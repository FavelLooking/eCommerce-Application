export type LoginFormFields = {
  email: string;
  password: string;
};

export type RegExps = {
  regex: RegExp;
  error: string;
};

export type CatalogDropdownType = {
  title: string;
  path: string;
  classname?: string;
};

export enum SortingTypes {
  NAMEASC = 'name.en asc',
  NAMEDESC = 'name.en desc',
  PRICEASC = 'price asc',
  PRICEDESC = 'price desc',
}

export type FilterFields = {
  price: string;
  length: string;
};
