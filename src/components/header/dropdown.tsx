import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { catalogMenuItems } from '../../utils/constants';
import { CatalogDropdownType } from '../../types';

export default function Dropdown() {
  const [click, setChick] = useState(false);

  const handleClick = () => setChick(!click);

  const generateDropdownLink = (item: CatalogDropdownType): JSX.Element => (
    <div>
      <li key={`dropdown-${item.title}`}>
        <NavLink className={item.classname} to={item.path}>
          {item.title}
        </NavLink>
      </li>
      {item.submenu &&
        item.submenu.map((subitem) => generateDropdownLink(subitem))}
    </div>
  );

  return (
    <ul
      role="presentation"
      onClick={handleClick}
      className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
    >
      {catalogMenuItems.map((item) => generateDropdownLink(item))}
    </ul>
  );
}
