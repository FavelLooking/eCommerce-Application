import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import './catalog.scss';
import {
  getProductDescription,
  getProductImage,
  getProductName,
  getProducts,
} from '../../services/productService';
import getInfoAboutProduct from '../../services/getDetailedProductInfo';

export const catalogLoader = async () => getProducts();

export function CatalogPage() {
  const data: Product[] = useLoaderData() as Product[];

  const navigate = useNavigate();

  const handleClick = (productId: string) => {
    getInfoAboutProduct(productId).then((productData) => {
      navigate(`/catalog/${productId}`, { state: productData });
    });
  };

  return (
    <div className="catalog-wrapper">
      {data.map((product) => (
        <div
          role="button"
          tabIndex={0}
          className="catalog-item"
          key={product.id}
          onClick={() => handleClick(product.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleClick(product.id);
            }
          }}
        >
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
          </div>
          <input type="button" className="catalog-add" />
        </div>
      ))}
    </div>
  );
}
