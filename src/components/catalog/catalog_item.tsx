import React from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import {
  getProductDescription,
  getProductImage,
  getProductName,
  getProductPrice,
} from '../../services/productService';

export default function CatalogItem(props: { product: ProductProjection }) {
  const { product } = props;

  const getPrice = (): JSX.Element => {
    const [originalPrice, discountPrice] = getProductPrice(product);

    if (!originalPrice) {
      return <div className="catalog-item-price">SOLD OUT</div>;
    }

    return discountPrice ? (
      <div className="catalog-item-price">
        <span className="catalog-price">{discountPrice}</span>
        <span className="catalog-price catalog-discounted">
          {originalPrice}
        </span>
      </div>
    ) : (
      <div className="catalog-item-price">
        <span className="catalog-price">{originalPrice}</span>
      </div>
    );
  };

  return (
    <div className="catalog-item">
      <img
        src={getProductImage(product)}
        alt="product"
        className="catalog-item-image"
      />
      <div className="catalog-item-info">
        <span className="catalog-item-name">{getProductName(product)}</span>
        <span className="catalog-item-description">
          {getProductDescription(product)}
        </span>
        {getPrice()}
      </div>
      <input type="button" className="catalog-add" />
    </div>
  );
}
