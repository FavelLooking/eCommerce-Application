import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthService from '../../services/authService';
import HeaderLink from './header_link';

export default function Header() {
  const { user, logout } = useAuth();

  const logoutUser = () => {
    AuthService.logoutUser();
    logout();
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://drive.google.com/thumbnail?id=1anQTSugURy_yNgW3hAIzsbKneY-mCC3I"
          className="header-logo"
          alt="Logo"
        />
      </Link>
      <div className="header-links">
        <HeaderLink isDisplayed text="Home" />
        <HeaderLink isDisplayed path="catalog" text="Catalog" />
        <HeaderLink isDisplayed={!user} path="login" text="Login" />
        <HeaderLink isDisplayed={!user} path="register" text="Register" />
        <HeaderLink isDisplayed={user} path="profile" text="Profile" />
        <HeaderLink
          isDisplayed={user}
          text="Logout"
          className="logout-link"
          onclick={logoutUser}
        />
      </div>
    </div>
  );
}
