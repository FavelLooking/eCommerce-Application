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
  submenu?: CatalogDropdownType[];
  classname?: string;
};

export enum SortingTypes {
  NAMEASC = 'name.en asc',
  NAMEDESC = 'name.en desc',
  PRICEASC = 'price asc',
  PRICEDESC = 'price desc',
}
