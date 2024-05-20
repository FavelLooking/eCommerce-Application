import React from 'react';
import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthService from '../../services/authService';

export default function Header() {
  const { user, logout } = useAuth();

  const logoutUser = () => {
    AuthService.logoutUser();
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
              color: '#48304D',
              backgroundColor: '#fbcaef',
            })}
          >
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}
