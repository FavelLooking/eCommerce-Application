import React from 'react';
import './main.scss';
import { useNavigate } from 'react-router-dom';
import { mainPageBannerImage, mainPagePromoImage } from '../../utils/constants';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="main-wrapper flex flex-column">
      <div className="flex main-promocodes">
        <div className="flex">
          <img
            src={mainPageBannerImage}
            alt="main baner"
            className="main-image"
          />
        </div>
        <div className="promocodes-list flex flex-column">
          <img
            src={mainPagePromoImage}
            alt="promocodes"
            className="main-image"
          />
          <input
            type="button"
            className="main-button"
            value="BUY ITY NOW"
            onClick={() => navigate('catalog')}
          />
        </div>
      </div>
    </div>
  );
}
