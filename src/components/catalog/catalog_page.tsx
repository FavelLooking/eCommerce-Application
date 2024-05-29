import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import './catalog.scss';
import {
  getProductDescription,
  getProductImage,
  getProductName,
  getProductPrice,
  getProducts,
} from '../../services/productService';
import Breadcrumb from './breadcrumb';

export const catalogLoader = async () => getProducts();

export function CatalogPage() {
  const data: Product[] = useLoaderData() as Product[];

  const getPrice = (product: Product): JSX.Element => {
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
    <div className="catalog_wrapper">
      <Breadcrumb />
      <div className="catalog_flex">
        {data.map((product) => (
          <div className="catalog-item" key={product.id}>
            <img
              src={getProductImage(product)}
              alt="product"
              className="catalog-item-image"
            />
            <div className="catalog-item-info">
              <span className="catalog-item-name">
                {getProductName(product)}
              </span>
              <span className="catalog-item-description">
                {getProductDescription(product)}
              </span>
              {getPrice(product)}
            </div>
            <input type="button" className="catalog-add" />
          </div>
        ))}
      </div>
    </div>
  );
}
