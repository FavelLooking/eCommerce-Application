import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Dropdown() {
  const [click, setChick] = useState(false);

  const handleClick = () => setChick(!click);

  return (
    <ul
      role="presentation"
      onClick={handleClick}
      className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      key="dropdown-ul-main"
    >
      <li key="dropdown-Comics">
        <NavLink className="dropdown-link" to="/catalog/comics">
          Comics
        </NavLink>
      </li>
      <li key="dropdown-DC">
        <NavLink className="dropdown-link sublink" to="/catalog/comics/dc">
          DC
        </NavLink>
      </li>
      <li key="dropdown-Marvel">
        <NavLink className="dropdown-link sublink" to="/catalog/comics/marvel">
          Marvel
        </NavLink>
      </li>
      <li key="dropdown-Archie">
        <NavLink className="dropdown-link sublink" to="catalog/comics/archie">
          Archie
        </NavLink>
      </li>
      <li key="dropdown-Boom">
        <NavLink className="dropdown-link sublink" to="catalog/comics/boom">
          Boom
        </NavLink>
      </li>
      <li key="dropdown-Darkhorse">
        <NavLink
          className="dropdown-link sublink"
          to="catalog/comics/darkhorse"
        >
          Darkhorse
        </NavLink>
      </li>
      <li key="dropdown-Manga">
        <NavLink className="dropdown-link" to="/catalog/manga">
          Manga
        </NavLink>
      </li>
      <li key="dropdown-Japan">
        <NavLink className="dropdown-link sublink" to="/catalog/manga/japan">
          Japan
        </NavLink>
      </li>
      <li key="dropdown-Korea">
        <NavLink className="dropdown-link sublink" to="/catalog/manga/korea">
          Korea
        </NavLink>
      </li>
      <li key="dropdown-China">
        <NavLink className="dropdown-link sublink" to="/catalog/manga/china">
          China
        </NavLink>
      </li>
    </ul>
  );
}
