import React from 'react';
import { NavLink } from 'react-router-dom';

type HeaderLinkProps = {
  isDisplayed: boolean;
  path: string;
  className: string;
  onclick: () => void;
  linkIcon?: number;
  linkImage?: string;
};

export default function HeaderLink(props: Partial<HeaderLinkProps>) {
  const { isDisplayed, path, className, onclick, linkIcon, linkImage } = props;

  return (
    isDisplayed && (
      <NavLink
        to={path || '/'}
        className={`header-link ${className}`}
        onClick={onclick}
        key={`header-link-${path}`}
      >
        {linkImage && (
          <div className="flex">
            <img
              src={linkImage}
              alt={`header-${path}`}
              className="header-icon-image"
            />
            <span>{linkIcon ?? ''}</span>
          </div>
        )}
      </NavLink>
    )
  );
}
