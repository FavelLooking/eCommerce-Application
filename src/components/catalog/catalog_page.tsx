import React from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import './catalog.scss';
import { getProducts } from '../../services/productService';
import Breadcrumb from './breadcrumb';
import CatalogItem from './catalog_item';

export const catalogLoader = async () => getProducts();

export function CatalogPage() {
  const data: Product[] = useLoaderData() as Product[];

  return data.length ? (
    <div className="catalog_wrapper">
      <Breadcrumb />
      <div className="catalog_flex">
        {data.map((item) => (
          <li key={item.id}>
            <CatalogItem product={item} />
          </li>
        ))}
      </div>
    </div>
  ) : (
    <Navigate to="/catalog" />
  );
}
