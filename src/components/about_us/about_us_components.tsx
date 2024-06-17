import React from 'react';
import {
  contributions,
  images,
  names,
  links,
  description,
  generateKey,
} from '../../utils/about_constants';

export function ImgComponent() {
  return (
    <div className="images-component">
      {images.map((img: string) => (
        <img
          key={generateKey(img)}
          className="member-photo"
          src={img}
          alt="member"
        />
      ))}
    </div>
  );
}

export function NamesComponent() {
  return (
    <div className="names-component">
      {names.map((name, index) => (
        <p key={generateKey(name)} className="names-text">
          <a
            href={links[index]}
            className="name-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </p>
      ))}
    </div>
  );
}

export function DescriptionComponent() {
  return (
    <div className="description-component">
      {description.map((paragraph) => (
        <p key={generateKey(paragraph)} className="description-text">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function ContributionComponent() {
  return (
    <div className="contribution-wrapper">
      {contributions.map((contributionList, index) => (
        <div
          key={`list-${generateKey(contributionList[index])}`}
          className="contribution-container"
        >
          {contributionList.map((contribution) => (
            <p key={generateKey(contribution)} className="contribution-text">
              {contribution}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
