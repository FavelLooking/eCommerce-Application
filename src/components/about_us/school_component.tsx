import React from 'react';
import './about.scss';
import {
  logo,
  schoolDescription,
  schoolLink,
} from '../../utils/about_constants';

export default function SchoolComponent() {
  return (
    <div className="school-wrapper">
      <p className="school-description">{schoolDescription}</p>
      <a href={schoolLink}>
        <img src={logo} className="school-logo" alt="school" />
      </a>
    </div>
  );
}
