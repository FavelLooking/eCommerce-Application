import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

type BreadcrumbProps = {
  path: string;
  text: string;
};

export default function BreadcrumbLink(props: BreadcrumbProps) {
  const { path, text } = props;
  const [isDisplayed] = useState(
    !!(path && window.location.href.indexOf(path) !== -1)
  );

  return (
    isDisplayed && (
      <NavLink to={path ?? '/'} className="breadcrump-link">
        {text}
      </NavLink>
    )
  );
}
