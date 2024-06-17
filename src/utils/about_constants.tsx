import React from 'react';

export const teamDescription = (
  <>
    <p>
      <b>Welcome to our Online Comics Shop!</b>{' '}
    </p>{' '}
    <p>
      Our platform brings you the finest American comics and Japanese, Korean,
      and Chinese manga right to your screen. We&apos;ve crafted this digital
      store to make discovering your favorite titles convenient and enjoyable
      from home.
    </p>
    <p>
      Our intuitive interface ensures a smooth journey from browsing our
      collection to completing your purchase. We emphasize user engagement and
      build trust at every step.
    </p>
    <p>
      Browse our extensive selection of comics and manga, featuring detailed
      descriptions and vibrant images. Add your top picks to your cart with
      ease. For your convenience, we provide quick registration and login,
      powerful search features, and user-friendly categorization.
    </p>
    <p>
      Dive into the world of comics and manga from the comfort of your home with
      our online shop.
    </p>
  </>
);

export const contributions = [
  [
    'Set up Netlify for website deployment',
    'Developed login, catalog, main and error pages',
    'Set up router (React Router)',
    'Added tests with Jest for the project',
    'Set up products filtering, sorting and searching',
    'Set up categories navigation',
    'Implemented promo code feature',
  ],
  [
    'Added development scripts and set up repository',
    'Implemented interactive product cards',
    'Developed registration, catalog and cart',
    'Implemented modal window with images of products',
  ],
  [
    'Created Development Environment Configuration',
    `Set up CommerceTools Project`,
    `Handle Authentication Token`,
    'Developed about us and user profile pages',
  ],
];

export const images = [
  'https://sun147-1.userapi.com/impg/Q4EOBh5Hd5iJQ84Ed25B108CxKzMnvqP7qsitA/QEIl_RgoUyM.jpg?size=1280x853&quality=96&sign=d01775c1162391a19c536678eb642eaa&type=album',
  'https://sun9-22.userapi.com/impg/TuNhMdZFbuUvS2K-YOOjzYx49yUU5SVe4bIqRw/7RxtV6ggoNY.jpg?size=640x640&quality=96&sign=f7e6a94409e23c5c31cc6b1ff290fdf9&type=album',
  'https://sun9-35.userapi.com/impg/yqTUDBPXb3nCvp5jNwG_H_m8ddc6GzsSKAdlkA/gcL0HTDIn9Q.jpg?size=728x728&quality=95&sign=f29a19bb98f036ee9d9c150592e42911&type=album',
];

export const names = ['Katsiaryna', 'Denis', 'Pavel'];
export const links = [
  'https://github.com/binkki',
  'https://github.com/IamBigBobby',
  'https://github.com/FavelLooking',
];

export const description = [
  'Hi. I graduated from Belarusian State University of Informatics and Radioelectronics. Now working as an Embedded Engineer. After relocation to Georgia, I decided to find a new job to have more opportunities.',
  `Hi! My name is Denis, I'm 31 years old, and I was born in Novosibirsk. I've always been passionate about technology and software development. This project is the result of my interest and experience in IT. I hope you enjoy what we've created and find something useful and interesting here.`,
  `Hi, I'm Pavel. I studied electric supply engineering at Murmansk State Technical University. After starting my own comic book shop, also I organized comic book festivals. Recently, I've been exploring C# and later frontend technologies like JavaScript and TypeScript. I'm planning to delve into React, React Native, and Three.js.`,
];

export function generateKey(content: string) {
  return content.substring(0, 9);
}

export const logo =
  'https://s.dou.ua/CACHE/images/img/events/rs-school/c469cd93b844c1ef4136a82c31fdf9ba.png';

export const schoolDescription =
  'RS School offers a unique learning experience as a free, community-based online education initiative. The RS School has been run by the Rolling Scopes community since 2013.';

export const schoolLink = 'https://rs.school/';
