import React from 'react';
import './about.scss';
import { teamDescription } from '../../utils/about_constants';
import TeamMember from './team_member';
import SchoolComponent from './school_component';

export default function AboutUsPage() {
  return (
    <div className="about">
      <div className="team-description">{teamDescription}</div>
      <TeamMember />
      <SchoolComponent />
    </div>
  );
}
