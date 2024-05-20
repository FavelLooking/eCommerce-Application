import React from 'react';
import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  const logoutUser = () => {
    logout();
  };

  return (
    <div className="header">
      <Link to="/">
        <img src="assets/logo.png" className="header-logo" alt="Logo" />
      </Link>
      <div className="header-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="login">Login</NavLink>
        <NavLink to="register">Register</NavLink>
        {user && (
          <NavLink to="/" onClick={logoutUser}>
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}
