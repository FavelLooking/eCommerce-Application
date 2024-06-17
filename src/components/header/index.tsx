import React, { useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthService from '../../services/authService';
import HeaderLink from './header_link';
import Dropdown from './dropdown';
import {
  catalogMenuItems,
  headerAboutImage,
  headerCartImage,
  headerCatalogImage,
  headerHomeImage,
  headerLoginImage,
  headerLogoImage,
  headerLogoutImage,
  headerProfileImage,
  headerRegisterImage,
} from '../../utils/constants';

export default function Header(props: { cartCounter: number }) {
  const { user, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const { cartCounter } = props;

  const logoutUser = () => {
    AuthService.logoutUser();
    logout();
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={headerLogoImage} className="header-logo" alt="Logo" />
      </Link>
      <ul className="header-links">
        <HeaderLink isDisplayed linkImage={headerHomeImage} />
        <li
          role="presentation"
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
          onClick={() => setDropdown(!dropdown)}
        >
          <HeaderLink
            isDisplayed
            path="catalog"
            linkImage={headerCatalogImage}
          />
          {dropdown && <Dropdown data={catalogMenuItems} id="catalog" />}
        </li>
        <HeaderLink
          isDisplayed={!user}
          path="login"
          linkImage={headerLoginImage}
        />
        <HeaderLink
          isDisplayed={!user}
          path="register"
          linkImage={headerRegisterImage}
        />
        <HeaderLink
          isDisplayed={user}
          path="profile"
          linkImage={headerProfileImage}
        />
        <HeaderLink
          isDisplayed
          path="cart"
          linkImage={headerCartImage}
          linkIcon={cartCounter}
        />
        <HeaderLink isDisplayed path="about" linkImage={headerAboutImage} />
        <HeaderLink
          isDisplayed={user}
          linkImage={headerLogoutImage}
          className="logout-link"
          onclick={logoutUser}
        />
      </ul>
    </div>
  );
}
