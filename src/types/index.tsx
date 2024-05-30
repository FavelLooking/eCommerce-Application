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
