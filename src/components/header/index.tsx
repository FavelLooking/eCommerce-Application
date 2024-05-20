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
        <NavLink to="/" className="header-link">
          Home
        </NavLink>
        <NavLink to="login" className="header-link">
          Login
        </NavLink>
        <NavLink to="register" className="header-link">
          Register
        </NavLink>
        {user && (
          <NavLink
            to="/"
            onClick={logoutUser}
            className="header-link"
            style={() => ({
              color: 'black',
              backgroundColor: 'white',
            })}
          >
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}
