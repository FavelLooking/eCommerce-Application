import React from 'react';
import { Link } from 'react-router-dom';
import './main.scss';

export default function Main() {
  return (
    <div className="main-wrapper">
      <div className="main-link-wrapper">
        <Link to="login" className="main-link">
          Login
        </Link>
        <Link to="register" className="main-link">
          Register
        </Link>
      </div>
    </div>
  );
}
