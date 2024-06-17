import React from 'react';
import {
  DescriptionComponent,
  NamesComponent,
  ImgComponent,
  ContributionComponent,
} from './about_us_components';

export default function TeamMember() {
  return (
    <div className="member-wrapper">
      <ImgComponent />
      <NamesComponent />
      <DescriptionComponent />
      <ContributionComponent />
    </div>
  );
}
