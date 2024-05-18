import React from 'react';
import './header.scss';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src="assets/logo.png" className="header-logo" alt="Logo" />
      </Link>
      <div className='header-links'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="login">Login</NavLink>
        <NavLink to="register">Register</NavLink>
      </div>        
    </div>
  );
}
