import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CatalogDropdownType } from '../../types';

export default function Dropdown(props: {
  data: CatalogDropdownType[];
  id: string;
}) {
  const { data, id } = props;
  const [click, setChick] = useState(false);

  return (
    <ul
      role="presentation"
      onClick={() => setChick(!click)}
      className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
    >
      {data.map((x: CatalogDropdownType) => (
        <li key={`dropdown--${id}-${x.title}`}>
          <NavLink className={x.classname} to={x.path}>
            {x.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
