import React from 'react';
import {
  DescriptionComponent,
  NamesComponent,
  ImgComponent,
  ContributionComponent,
} from '../../utils/about_constants';

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
