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
    submenu: [
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
    ],
  },
  {
    title: 'Manga',
    path: '/catalog/manga',
    classname: 'dropdown-link',
    submenu: [
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
    ],
  },
];
