import React from 'react';
import { NavLink } from 'react-router-dom';

type HeaderLinkProps = {
  isDisplayed: boolean;
  path: string;
  text: string;
  className: string;
  onclick: () => void;
};

export default function HeaderLink(props: Partial<HeaderLinkProps>) {
  const { isDisplayed, path, text, className, onclick } = props;

  return (
    isDisplayed && (
      <NavLink
        to={path || '/'}
        className={`header-link ${className}`}
        onClick={onclick}
        key={`header-link-${text}`}
      >
        {text}
      </NavLink>
    )
  );
}
