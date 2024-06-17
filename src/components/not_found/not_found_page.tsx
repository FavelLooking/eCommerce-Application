import React from 'react';
import { Link } from 'react-router-dom';
import './not_found.scss';
import { notFoundPageImage } from '../../utils/constants';

export default function NotFoundPage() {
  return (
    <div className="error-wrapper">
      <img src={notFoundPageImage} alt="notfound" className="cart-empty" />
      <Link to="/" className="error-link">
        GO HOME
      </Link>
    </div>
  );
}
