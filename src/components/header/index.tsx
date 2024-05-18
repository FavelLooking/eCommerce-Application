import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src="assets/logo.png" className="header-logo" alt="Logo" />
      </Link>
    </div>
  );
}
