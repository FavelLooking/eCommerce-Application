import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import './catalog.scss';
import {
  getProductDescription,
  getProductImage,
  getProductName,
  getProducts,
} from '../../services/productService';

export const catalogLoader = async () => getProducts();

export function CatalogPage() {
  const data: Product[] = useLoaderData() as Product[];

  return (
    <div className="catalog-wrapper">
      {data.map((product) => (
        <Link
          to={`/catalog/category/subcategory/${product.id}`}
          className="catalog-item"
          key={product.id}
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
        </Link>
      ))}
    </div>
  );
}
