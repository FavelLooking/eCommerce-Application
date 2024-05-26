import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import './catalog.scss';
import {
  getProductDescription,
  getProductImage,
  getProductName,
  getProducts,
} from '../../services/productService';
import getInfoAboutProduct from '../../utils/detailed_product_component_utils/getailed_product_get_info';

export const catalogLoader = async () => getProducts();

export function CatalogPage() {
  const data: Product[] = useLoaderData() as Product[];

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    productId: string
  ) => {
    if (event.key === 'Enter') {
      getInfoAboutProduct(productId);
    }
  };

  return (
    <div className="catalog-wrapper">
      {data.map((product) => (
        <div
          className="catalog-item"
          key={product.id}
          onClick={() => getInfoAboutProduct(product.id)}
          onKeyDown={(event) => handleKeyDown(event, product.id)}
          role="button"
          tabIndex={0}
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
