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
export const storageCustomerId = 'customerId';
export const storageCartId = 'cartId';

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

export const pageLimit = 10;

export const deleteText = '❌';
export const plusText = '➕';
export const minusText = '➖';

export const notFoundPageImage = 'https://i.ibb.co/bmn9DLc/not-found-page.png';
export const emptyCartImage = 'https://i.ibb.co/JptLRFn/cart-empty.png';
export const headerLogoImage = 'https://i.ibb.co/KcnrCbB/header-logo.png';
export const headerLoginImage = 'https://i.ibb.co/X7GWYSN/header-login.png';
export const headerLogoutImage = 'https://i.ibb.co/KXDph9q/header-logout.png';
export const headerCartImage = 'https://i.ibb.co/PmTYjkB/header-cart.png';
export const headerHomeImage = 'https://i.ibb.co/6mwWhsr/header-home.png';
export const headerAboutImage = 'https://i.ibb.co/NCRVttw/header-about.png';
export const headerProfileImage = 'https://i.ibb.co/2tmC8Yb/header-profile.png';
export const headerCatalogImage = 'https://i.ibb.co/TMfzMW7/header-catalog.png';
export const headerRegisterImage =
  'https://i.ibb.co/cyDDH4z/header-register.png';
export const mainPageBannerImage = 'https://i.ibb.co/V3MH2Dk/main-baner.png';
export const mainPagePromoImage =
  'https://i.ibb.co/tJWM3Wx/main-promocodes.png';
