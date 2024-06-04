import { SortingTypes } from '../types';

export const emailPattern = {
  regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  error: 'wrong email format',
};

export const textLengthPattern = {
  regex: /^.{8,20}$/,
  error: 'length of this field must be from 8 to 20 characters',
};
export const textUpperPattern = {
  regex: /(?=.*[A-Z])/,
  error: 'this field must contain at least one uppercase character A-Z',
};

export const textLowerPattern = {
  regex: /(?=.*[a-z])/,
  error: 'this field must contain at least one lovercase character a-z',
};

export const textNumberPattern = {
  regex: /(?=.*[0-9])/,
  error: 'this field must contain at least one number 0-9',
};

export const textSymbolPattern = {
  regex: /(?=.*[!@#$%^&*])/,
  error:
    'this field must contain at least one of these special symbols !@#$%^&*',
};

export const textSpacesPattern = {
  regex: /^\S*$/,
  error: 'this field must not contain any whitespaces',
};

export const storageLoginError = 'LoginErrorMessage';
export const storageIsLogined = 'IsUserLogined';

export const catalogMenuItems = [
  {
    title: 'Comics',
    path: '/catalog/comics',
    classname: 'dropdown-link',
  },
  {
    title: 'DC',
    path: '/catalog/comics/dc',
    classname: 'dropdown-link sublink',
  },
  {
    title: 'Marvel',
    path: '/catalog/comics/marvel',
    classname: 'dropdown-link sublink',
  },
  {
    title: 'Archie',
    path: 'catalog/comics/archie',
    classname: 'dropdown-link sublink',
  },
  {
    title: 'Boom',
    path: 'catalog/comics/boom',
    classname: 'dropdown-link sublink',
  },
  {
    title: 'Darkhorse',
    path: 'catalog/comics/darkhorse',
    classname: 'dropdown-link sublink',
  },
  {
    title: 'Manga',
    path: '/catalog/manga',
    classname: 'dropdown-link',
  },
  {
    title: 'Japan',
    path: '/catalog/manga/japan',
    classname: 'dropdown-link sublink',
  },
  {
    title: 'Korea',
    path: '/catalog/manga/korea',
    classname: 'dropdown-link sublink',
  },
  {
    title: 'China',
    path: '/catalog/manga/china',
    classname: 'dropdown-link sublink',
  },
];

export const comicsSet = ['dc', 'marvel', 'archie', 'boom', 'darkhorse'];
export const mangaSet = ['japan', 'korea', 'china'];

export const sortButtons = [
  {
    type: 'button',
    value: 'name ↑',
    sort: SortingTypes.NAMEASC,
  },
  {
    type: 'button',
    value: 'name ↓',
    sort: SortingTypes.NAMEDESC,
  },
  {
    type: 'button',
    value: 'price ↑',
    sort: SortingTypes.PRICEASC,
  },
  {
    type: 'button',
    value: 'price ↓',
    sort: SortingTypes.PRICEDESC,
  },
];

export const priceCurrency = '€';

export const priceFilter = [
  'any price',
  'from 0 to 10 €',
  'from 10 to 20 €',
  'from 20 to 50 €',
  'from 50 to 100 €',
  'from 100 to 200 €',
];

export const lengthFilter = [
  'any length',
  'from 0 to 100 pages',
  'from 100 to 300 pages',
  'from 300 to 500 pages',
  'from 500 to 1500 pages',
];
