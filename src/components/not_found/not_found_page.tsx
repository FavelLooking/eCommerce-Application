import React from 'react';
import { Link } from 'react-router-dom';
import './not_found.scss';

export default function NotFound() {
  return (
    <div className="error-wrapper">
      <p className="error-text error-big">Oops! Looks like you are lost</p>
      <p className="error-text error-small">
        the page you are looking for not avaible
      </p>
      <Link to="/" className="error-link">
        Go to Home
      </Link>
    </div>
  );
}
